import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { addExpense, deleteExpense, getExpenses } from "../services/api";
import { Expense } from "../types/expense";

const CATEGORY_EMOJI: Record<string, string> = {
  "Food & Dining": "🍔",
  Transport: "🚗",
  Shopping: "🛒",
  Entertainment: "📺",
  "Bills & Utilities": "📄",
  Health: "💊",
  Travel: "✈️",
  Other: "📦",
};

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const seconds = Math.max(1, Math.floor(diff / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ExpenseTrackerScreen() {
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [successExpense, setSuccessExpense] = useState<Expense | null>(null);
  const [deletingIds, setDeletingIds] = useState<Record<number, boolean>>({});
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSubmit = input.trim().length > 0 && !submitting;

  const loadExpenses = useCallback(async () => {
    const list = await getExpenses();
    setExpenses(list);
  }, []);

  useEffect(() => {
    loadExpenses().catch((err) => {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to load expenses");
    });
  }, [loadExpenses]);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadExpenses();
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to refresh");
    } finally {
      setRefreshing(false);
    }
  }, [loadExpenses]);

  const onAdd = useCallback(async () => {
    const text = input.trim();
    if (!text) return;

    setSubmitting(true);
    try {
      const created = await addExpense(text);
      setInput("");
      setSuccessExpense(created);
      setExpenses((prev) => [created, ...prev]);

      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSuccessExpense(null), 3000);
    } catch (err) {
      Alert.alert("Could not add expense", err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }, [input]);

  const confirmDelete = useCallback(
    (expense: Expense) => {
      Alert.alert("Delete this expense?", undefined, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingIds((m) => ({ ...m, [expense.id]: true }));
            const prev = expenses;
            setExpenses((list) => list.filter((e) => e.id !== expense.id));

            try {
              await deleteExpense(expense.id);
            } catch (err) {
              setExpenses(prev);
              Alert.alert(
                "Delete failed",
                err instanceof Error ? err.message : "Unknown error",
              );
            } finally {
              setDeletingIds((m) => {
                const next = { ...m };
                delete next[expense.id];
                return next;
              });
            }
          },
        },
      ]);
    },
    [expenses],
  );

  const empty = useMemo(() => {
    if (refreshing) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No expenses yet.</Text>
        <Text style={styles.emptySubtitle}>Add your first one!</Text>
      </View>
    );
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Expense Tracker</Text>
        <Text style={styles.subtitle}>Add expenses in plain English</Text>
      </View>

      <View style={styles.inputCard}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="e.g., Spent 500 on groceries at BigBazaar"
          placeholderTextColor="#94a3b8"
          style={styles.textInput}
          editable={!submitting}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
        <Pressable
          onPress={onAdd}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.addButton,
            !canSubmit && styles.addButtonDisabled,
            pressed && canSubmit && styles.addButtonPressed,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Add</Text>
          )}
        </Pressable>
      </View>

      {successExpense ? (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>✅ Added Successfully!</Text>
          <View style={styles.successRow}>
            <Text style={styles.successLabel}>Amount</Text>
            <Text style={styles.successValue}>
              ₹{Number(successExpense.amount).toFixed(0)}
            </Text>
          </View>
          <View style={styles.successRow}>
            <Text style={styles.successLabel}>Category</Text>
            <Text style={styles.successValue}>
              {(CATEGORY_EMOJI[successExpense.category] ?? "📦") +
                " " +
                successExpense.category}
            </Text>
          </View>
          <View style={styles.successRow}>
            <Text style={styles.successLabel}>Description</Text>
            <Text style={styles.successValue}>{successExpense.description}</Text>
          </View>
          <View style={styles.successRow}>
            <Text style={styles.successLabel}>Merchant</Text>
            <Text style={styles.successValue}>{successExpense.merchant ?? "—"}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={empty}
        renderItem={({ item }) => {
          const emoji = CATEGORY_EMOJI[item.category] ?? "📦";
          const deleting = !!deletingIds[item.id];

          return (
            <View style={styles.itemCard}>
              <View style={styles.itemTop}>
                <View style={styles.itemCategory}>
                  <Text style={styles.itemEmoji}>{emoji}</Text>
                  <Text style={styles.itemCategoryText}>{item.category}</Text>
                </View>
                <Text style={styles.itemAmount}>₹{Number(item.amount).toFixed(0)}</Text>
              </View>

              <Text style={styles.itemDescription}>{item.description}</Text>

              <View style={styles.itemBottom}>
                <Text style={styles.itemTime}>{timeAgo(item.created_at)}</Text>
                <Pressable
                  disabled={deleting}
                  onPress={() => confirmDelete(item)}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && !deleting && styles.deleteButtonPressed,
                    deleting && styles.deleteButtonDisabled,
                  ]}
                >
                  {deleting ? (
                    <ActivityIndicator color="#ef4444" />
                  ) : (
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  )}
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b",
  },
  inputCard: {
    marginHorizontal: 20,
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#0f172a",
    backgroundColor: "#fff",
  },
  addButton: {
    minWidth: 84,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#0f172a",
    paddingHorizontal: 14,
  },
  addButtonDisabled: {
    backgroundColor: "#94a3b8",
  },
  addButtonPressed: {
    opacity: 0.9,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  successCard: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: "#ecfdf5",
    borderColor: "#86efac",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  successTitle: {
    fontWeight: "800",
    color: "#065f46",
    marginBottom: 8,
  },
  successRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6,
  },
  successLabel: {
    color: "#047857",
    fontWeight: "600",
  },
  successValue: {
    color: "#064e3b",
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right",
  },
  sectionHeader: {
    marginTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  itemCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  itemEmoji: {
    fontSize: 18,
  },
  itemCategoryText: {
    fontWeight: "700",
    color: "#0f172a",
    flexShrink: 1,
  },
  itemAmount: {
    fontWeight: "900",
    color: "#0f172a",
  },
  itemDescription: {
    marginTop: 8,
    color: "#64748b",
  },
  itemBottom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTime: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fff",
  },
  deleteButtonPressed: {
    backgroundColor: "#fff1f2",
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: "#ef4444",
    fontWeight: "800",
  },
  empty: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyTitle: {
    fontWeight: "800",
    color: "#0f172a",
  },
  emptySubtitle: {
    marginTop: 6,
    color: "#64748b",
  },
});

