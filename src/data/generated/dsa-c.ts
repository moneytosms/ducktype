import type { Snippet } from "@/types/snippet";

export const dsaCSnippets: Snippet[] = [
  {
    id: "c75-two-sum",
    title: "Two sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "arrays",
    prompt: "Find indices of two numbers in an array that add up to a target, using a simple hash table.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["structs", "hash tables", "loops"],
    code: String.raw`#define TABLE_SIZE 10007

typedef struct { int key; int idx; int used; } Entry;

static int hash_key(int key) {
    unsigned int h = (unsigned int)key;
    return (int)(h % TABLE_SIZE);
}

void two_sum(const int *nums, int n, int target, int *out_i, int *out_j) {
    Entry table[TABLE_SIZE] = {0};

    for (int i = 0; i < n; i++) {
        int need = target - nums[i];
        int h = hash_key(need);
        while (table[h].used) {
            if (table[h].key == need) {
                *out_i = table[h].idx;
                *out_j = i;
                return;
            }
            h = (h + 1) % TABLE_SIZE;
        }
        int h2 = hash_key(nums[i]);
        while (table[h2].used) h2 = (h2 + 1) % TABLE_SIZE;
        table[h2].key = nums[i];
        table[h2].idx = i;
        table[h2].used = 1;
    }
}`,
  },
  {
    id: "c75-contains-duplicate",
    title: "Contains duplicate",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "arrays",
    prompt: "Determine whether any value appears at least twice in an array.",
    shikiLang: "c",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["qsort", "comparators", "loops"],
    code: String.raw`static int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int contains_duplicate(int *nums, int n) {
    qsort(nums, n, sizeof(int), cmp_int);

    for (int i = 1; i < n; i++) {
        if (nums[i] == nums[i - 1]) {
            return 1;
        }
    }
    return 0;
}`,
  },
  {
    id: "c75-valid-anagram",
    title: "Valid anagram",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "strings",
    prompt: "Check whether two lowercase strings are anagrams of one another.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["char arithmetic", "fixed arrays", "string length"],
    code: String.raw`#include <string.h>

int is_anagram(const char *s, const char *t) {
    if (strlen(s) != strlen(t)) {
        return 0;
    }

    int counts[26] = {0};

    for (int i = 0; s[i]; i++) {
        counts[s[i] - 'a']++;
    }
    for (int i = 0; t[i]; i++) {
        counts[t[i] - 'a']--;
    }

    for (int i = 0; i < 26; i++) {
        if (counts[i] != 0) {
            return 0;
        }
    }
    return 1;
}`,
  },
  {
    id: "c75-top-k-frequent-elements",
    title: "Top K frequent elements",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "arrays",
    prompt: "Return the k most frequent values in an integer array using bucket counting.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["bucket sort", "nested loops", "arrays"],
    code: String.raw`#define MAX_VAL 2001

void top_k_frequent(const int *nums, int n, int k, int *out) {
    int counts[2 * MAX_VAL + 1] = {0};

    for (int i = 0; i < n; i++) {
        counts[nums[i] + MAX_VAL]++;
    }

    int buckets[2 * MAX_VAL + 1][2];
    int bucket_count = 0;
    for (int v = -MAX_VAL; v <= MAX_VAL; v++) {
        if (counts[v + MAX_VAL] > 0) {
            buckets[bucket_count][0] = v;
            buckets[bucket_count][1] = counts[v + MAX_VAL];
            bucket_count++;
        }
    }

    for (int i = 0; i < bucket_count - 1; i++) {
        for (int j = 0; j < bucket_count - i - 1; j++) {
            if (buckets[j][1] < buckets[j + 1][1]) {
                int tmp0 = buckets[j][0], tmp1 = buckets[j][1];
                buckets[j][0] = buckets[j + 1][0];
                buckets[j][1] = buckets[j + 1][1];
                buckets[j + 1][0] = tmp0;
                buckets[j + 1][1] = tmp1;
            }
        }
    }

    for (int i = 0; i < k; i++) {
        out[i] = buckets[i][0];
    }
}`,
  },
  {
    id: "c75-product-of-array-except-self",
    title: "Product of array except self",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "arrays",
    prompt: "Build an array where each element is the product of all other elements, without using division.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) extra space",
    typingFocus: ["prefix products", "two passes", "array indexing"],
    code: String.raw`void product_except_self(const int *nums, int n, int *out) {
    out[0] = 1;
    for (int i = 1; i < n; i++) {
        out[i] = out[i - 1] * nums[i - 1];
    }

    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        out[i] *= suffix;
        suffix *= nums[i];
    }
}`,
  },
  {
    id: "c75-longest-consecutive-sequence",
    title: "Longest consecutive sequence",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C",
    category: "arrays",
    prompt: "Find the length of the longest run of consecutive integers present in an unsorted array.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["hash sets", "open addressing", "while loops"],
    code: String.raw`#define SEQ_TABLE 20011

static int seq_hash(int key) {
    unsigned int h = (unsigned int)key;
    return (int)(h % SEQ_TABLE);
}

static int seq_contains(const int *table, const int *used, int key) {
    int h = seq_hash(key);
    while (used[h]) {
        if (table[h] == key) return 1;
        h = (h + 1) % SEQ_TABLE;
    }
    return 0;
}

int longest_consecutive(const int *nums, int n) {
    int table[SEQ_TABLE];
    int used[SEQ_TABLE] = {0};

    for (int i = 0; i < n; i++) {
        int h = seq_hash(nums[i]);
        while (used[h] && table[h] != nums[i]) h = (h + 1) % SEQ_TABLE;
        table[h] = nums[i];
        used[h] = 1;
    }

    int best = 0;
    for (int i = 0; i < n; i++) {
        if (seq_contains(table, used, nums[i] - 1)) continue;
        int len = 1;
        while (seq_contains(table, used, nums[i] + len)) len++;
        if (len > best) best = len;
    }
    return best;
}`,
  },
  {
    id: "c75-valid-palindrome",
    title: "Valid palindrome",
    domain: "dsa",
    track: "Two Pointers",
    language: "C",
    category: "strings",
    prompt: "Check whether a string is a palindrome once non-alphanumeric characters are ignored and case is folded.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "ctype functions", "while loops"],
    code: String.raw`#include <ctype.h>

int is_palindrome(const char *s) {
    int left = 0;
    int right = (int)strlen(s) - 1;

    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) left++;
        while (left < right && !isalnum((unsigned char)s[right])) right--;

        if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right])) {
            return 0;
        }
        left++;
        right--;
    }
    return 1;
}`,
  },
  {
    id: "c75-three-sum",
    title: "3Sum",
    domain: "dsa",
    track: "Two Pointers",
    language: "C",
    category: "arrays",
    prompt: "Find all unique triplets in an array that sum to zero.",
    shikiLang: "c",
    optimality: "O(n^2) time, O(1) extra space",
    typingFocus: ["sorting", "two pointers", "duplicate skipping"],
    code: String.raw`static int cmp_int3(const void *a, const void *b) {
    return (*(const int *)a) - (*(const int *)b);
}

int three_sum(int *nums, int n, int triplets[][3], int max_triplets) {
    qsort(nums, n, sizeof(int), cmp_int3);
    int count = 0;

    for (int i = 0; i < n - 2 && count < max_triplets; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1;
        int right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                triplets[count][0] = nums[i];
                triplets[count][1] = nums[left];
                triplets[count][2] = nums[right];
                count++;
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
            }
        }
    }
    return count;
}`,
  },
  {
    id: "c75-container-with-most-water",
    title: "Container with most water",
    domain: "dsa",
    track: "Two Pointers",
    language: "C",
    category: "arrays",
    prompt: "Pick two lines from an array of heights that together with the x-axis hold the most water.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "min/max", "greedy narrowing"],
    code: String.raw`int max_area(const int *height, int n) {
    int left = 0;
    int right = n - 1;
    int best = 0;

    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = h * (right - left);
        if (area > best) best = area;

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
}`,
  },
  {
    id: "c75-trapping-rain-water",
    title: "Trapping rain water",
    domain: "dsa",
    track: "Two Pointers",
    language: "C",
    category: "arrays",
    prompt: "Compute how much rain water is trapped between bars of an elevation map.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "running maxima", "accumulation"],
    code: String.raw`int trap(const int *height, int n) {
    int left = 0;
    int right = n - 1;
    int left_max = 0;
    int right_max = 0;
    int total = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            left_max = left_max > height[left] ? left_max : height[left];
            total += left_max - height[left];
            left++;
        } else {
            right_max = right_max > height[right] ? right_max : height[right];
            total += right_max - height[right];
            right--;
        }
    }
    return total;
}`,
  },
  {
    id: "c75-best-time-to-buy-sell-stock",
    title: "Best time to buy and sell stock",
    domain: "dsa",
    track: "Sliding Window",
    language: "C",
    category: "arrays",
    prompt: "Find the maximum profit from buying then selling a stock once given daily prices.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running minimum", "single pass", "conditionals"],
    code: String.raw`int max_profit(const int *prices, int n) {
    int min_price = prices[0];
    int best = 0;

    for (int i = 1; i < n; i++) {
        if (prices[i] < min_price) {
            min_price = prices[i];
        } else if (prices[i] - min_price > best) {
            best = prices[i] - min_price;
        }
    }
    return best;
}`,
  },
  {
    id: "c75-longest-substring-without-repeating",
    title: "Longest substring without repeating characters",
    domain: "dsa",
    track: "Sliding Window",
    language: "C",
    category: "strings",
    prompt: "Find the length of the longest substring that has no repeated characters.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["sliding window", "ascii tables", "pointer arithmetic"],
    code: String.raw`int length_of_longest_substring(const char *s) {
    int last_seen[256];
    for (int i = 0; i < 256; i++) last_seen[i] = -1;

    int left = 0;
    int best = 0;

    for (int right = 0; s[right]; right++) {
        unsigned char c = (unsigned char)s[right];
        if (last_seen[c] >= left) {
            left = last_seen[c] + 1;
        }
        last_seen[c] = right;

        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}`,
  },
  {
    id: "c75-longest-repeating-character-replacement",
    title: "Longest repeating character replacement",
    domain: "dsa",
    track: "Sliding Window",
    language: "C",
    category: "strings",
    prompt: "Find the longest substring achievable by replacing at most k characters so it becomes all one letter.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["sliding window", "frequency counts", "max tracking"],
    code: String.raw`int character_replacement(const char *s, int k) {
    int counts[26] = {0};
    int left = 0;
    int max_count = 0;
    int best = 0;

    for (int right = 0; s[right]; right++) {
        int idx = s[right] - 'A';
        counts[idx]++;
        if (counts[idx] > max_count) max_count = counts[idx];

        int window_len = right - left + 1;
        if (window_len - max_count > k) {
            counts[s[left] - 'A']--;
            left++;
        }

        window_len = right - left + 1;
        if (window_len > best) best = window_len;
    }
    return best;
}`,
  },
  {
    id: "c75-permutation-in-string",
    title: "Permutation in string",
    domain: "dsa",
    track: "Sliding Window",
    language: "C",
    category: "strings",
    prompt: "Check whether a permutation of one string occurs as a contiguous substring of another.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["fixed-size windows", "count comparison", "memcmp"],
    code: String.raw`#include <string.h>

int check_inclusion(const char *s1, const char *s2) {
    int need[26] = {0};
    int have[26] = {0};
    int len1 = (int)strlen(s1);
    int len2 = (int)strlen(s2);
    if (len1 > len2) return 0;

    for (int i = 0; i < len1; i++) {
        need[s1[i] - 'a']++;
        have[s2[i] - 'a']++;
    }
    if (memcmp(need, have, sizeof(need)) == 0) return 1;

    for (int i = len1; i < len2; i++) {
        have[s2[i] - 'a']++;
        have[s2[i - len1] - 'a']--;
        if (memcmp(need, have, sizeof(need)) == 0) return 1;
    }
    return 0;
}`,
  },
  {
    id: "c75-valid-parentheses",
    title: "Valid parentheses",
    domain: "dsa",
    track: "Stack",
    language: "C",
    category: "strings",
    prompt: "Check whether every bracket in a string is closed in the correct order.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack arrays", "switch statements", "matching pairs"],
    code: String.raw`int is_valid(const char *s) {
    char stack[10000];
    int top = -1;

    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[++top] = c;
        } else {
            if (top < 0) return 0;
            char open = stack[top--];
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) {
                return 0;
            }
        }
    }
    return top == -1;
}`,
  },
  {
    id: "c75-min-stack",
    title: "Min stack",
    domain: "dsa",
    track: "Stack",
    language: "C",
    category: "stacks",
    prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    shikiLang: "c",
    optimality: "O(1) time per operation, O(n) space",
    typingFocus: ["parallel arrays", "struct design", "invariants"],
    code: String.raw`typedef struct {
    int values[10000];
    int mins[10000];
    int top;
} MinStack;

void min_stack_init(MinStack *s) {
    s->top = -1;
}

void min_stack_push(MinStack *s, int val) {
    s->top++;
    s->values[s->top] = val;
    if (s->top == 0 || val < s->mins[s->top - 1]) {
        s->mins[s->top] = val;
    } else {
        s->mins[s->top] = s->mins[s->top - 1];
    }
}

void min_stack_pop(MinStack *s) {
    s->top--;
}

int min_stack_top(const MinStack *s) {
    return s->values[s->top];
}

int min_stack_get_min(const MinStack *s) {
    return s->mins[s->top];
}`,
  },
  {
    id: "c75-evaluate-reverse-polish-notation",
    title: "Evaluate reverse Polish notation",
    domain: "dsa",
    track: "Stack",
    language: "C",
    category: "stacks",
    prompt: "Evaluate an arithmetic expression given in reverse Polish (postfix) notation.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack arrays", "strcmp", "atoi"],
    code: String.raw`#include <stdlib.h>
#include <string.h>

int eval_rpn(char **tokens, int n) {
    int stack[10000];
    int top = -1;

    for (int i = 0; i < n; i++) {
        char *tok = tokens[i];
        if (strcmp(tok, "+") == 0 || strcmp(tok, "-") == 0 ||
            strcmp(tok, "*") == 0 || strcmp(tok, "/") == 0) {
            int b = stack[top--];
            int a = stack[top--];
            int result;
            if (tok[0] == '+') result = a + b;
            else if (tok[0] == '-') result = a - b;
            else if (tok[0] == '*') result = a * b;
            else result = a / b;
            stack[++top] = result;
        } else {
            stack[++top] = atoi(tok);
        }
    }
    return stack[top];
}`,
  },
  {
    id: "c75-daily-temperatures",
    title: "Daily temperatures",
    domain: "dsa",
    track: "Stack",
    language: "C",
    category: "stacks",
    prompt: "For each day, find how many days until a warmer temperature using a monotonic stack.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack", "index arrays", "while loops"],
    code: String.raw`void daily_temperatures(const int *temps, int n, int *out) {
    int stack[100000];
    int top = -1;

    for (int i = 0; i < n; i++) {
        out[i] = 0;
    }

    for (int i = 0; i < n; i++) {
        while (top >= 0 && temps[i] > temps[stack[top]]) {
            int prev = stack[top--];
            out[prev] = i - prev;
        }
        stack[++top] = i;
    }
}`,
  },
  {
    id: "c75-search-2d-matrix",
    title: "Search a 2D matrix",
    domain: "dsa",
    track: "Binary Search",
    language: "C",
    category: "matrices",
    prompt: "Search a target value in a matrix whose rows and columns are sorted like a flattened sorted array.",
    shikiLang: "c",
    optimality: "O(log(m*n)) time, O(1) space",
    typingFocus: ["binary search", "index math", "2D arrays"],
    code: String.raw`int search_matrix(int **matrix, int rows, int cols, int target) {
    int left = 0;
    int right = rows * cols - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        int value = matrix[mid / cols][mid % cols];

        if (value == target) {
            return 1;
        }
        if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return 0;
}`,
  },
  {
    id: "c75-koko-eating-bananas",
    title: "Koko eating bananas",
    domain: "dsa",
    track: "Binary Search",
    language: "C",
    category: "binary search",
    prompt: "Find the minimum eating speed so Koko can finish all piles of bananas within h hours.",
    shikiLang: "c",
    optimality: "O(n log(max pile)) time, O(1) space",
    typingFocus: ["binary search on answer", "ceiling division", "loops"],
    code: String.raw`static int hours_needed(const int *piles, int n, int speed) {
    int hours = 0;
    for (int i = 0; i < n; i++) {
        hours += (piles[i] + speed - 1) / speed;
    }
    return hours;
}

int min_eating_speed(const int *piles, int n, int h) {
    int left = 1;
    int right = 0;
    for (int i = 0; i < n; i++) {
        if (piles[i] > right) right = piles[i];
    }

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (hours_needed(piles, n, mid) <= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}`,
  },
  {
    id: "c75-find-minimum-rotated-sorted-array",
    title: "Find minimum in rotated sorted array",
    domain: "dsa",
    track: "Binary Search",
    language: "C",
    category: "binary search",
    prompt: "Find the smallest element in a rotated, otherwise sorted array of unique values.",
    shikiLang: "c",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["binary search", "rotation logic", "comparisons"],
    code: String.raw`int find_min(const int *nums, int n) {
    int left = 0;
    int right = n - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}`,
  },
  {
    id: "c75-search-rotated-sorted-array",
    title: "Search in rotated sorted array",
    domain: "dsa",
    track: "Binary Search",
    language: "C",
    category: "binary search",
    prompt: "Search a target in a rotated, otherwise sorted array of unique values in logarithmic time.",
    shikiLang: "c",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["binary search", "rotation cases", "conditionals"],
    code: String.raw`int search_rotated(const int *nums, int n, int target) {
    int left = 0;
    int right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`,
  },
  {
    id: "c75-reverse-linked-list",
    title: "Reverse linked list",
    domain: "dsa",
    track: "Linked List",
    language: "C",
    category: "linked lists",
    prompt: "Reverse a singly linked list in place.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["struct pointers", "pointer swapping", "while loops"],
    code: String.raw`typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode *reverse_list(ListNode *head) {
    ListNode *prev = NULL;
    ListNode *curr = head;

    while (curr) {
        ListNode *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
  },
  {
    id: "c75-merge-two-sorted-lists",
    title: "Merge two sorted lists",
    domain: "dsa",
    track: "Linked List",
    language: "C",
    category: "linked lists",
    prompt: "Merge two sorted linked lists into one sorted linked list by relinking nodes.",
    shikiLang: "c",
    optimality: "O(n + m) time, O(1) space",
    typingFocus: ["dummy nodes", "struct pointers", "list splicing"],
    code: String.raw`typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode *merge_two_lists(ListNode *l1, ListNode *l2) {
    ListNode dummy;
    ListNode *tail = &dummy;
    dummy.next = NULL;

    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }

    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
  },
  {
    id: "c75-linked-list-cycle",
    title: "Linked list cycle",
    domain: "dsa",
    track: "Linked List",
    language: "C",
    category: "linked lists",
    prompt: "Determine whether a singly linked list contains a cycle using two pointers.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "struct pointers", "while loops"],
    code: String.raw`typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

int has_cycle(ListNode *head) {
    ListNode *slow = head;
    ListNode *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return 1;
        }
    }
    return 0;
}`,
  },
  {
    id: "c75-remove-nth-node-from-end",
    title: "Remove Nth node from end of list",
    domain: "dsa",
    track: "Linked List",
    language: "C",
    category: "linked lists",
    prompt: "Remove the nth node from the end of a singly linked list in one pass.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "dummy nodes", "free"],
    code: String.raw`typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode *remove_nth_from_end(ListNode *head, int n) {
    ListNode dummy;
    dummy.next = head;
    ListNode *fast = &dummy;
    ListNode *slow = &dummy;

    for (int i = 0; i < n; i++) {
        fast = fast->next;
    }
    while (fast->next) {
        fast = fast->next;
        slow = slow->next;
    }

    ListNode *to_delete = slow->next;
    slow->next = to_delete->next;
    free(to_delete);
    return dummy.next;
}`,
  },
  {
    id: "c75-palindrome-linked-list",
    title: "Palindrome linked list",
    domain: "dsa",
    track: "Linked List",
    language: "C",
    category: "linked lists",
    prompt: "Check whether a singly linked list reads the same forwards and backwards.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "in-place reversal", "comparisons"],
    code: String.raw`typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

int is_palindrome_list(ListNode *head) {
    ListNode *slow = head;
    ListNode *fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode *prev = NULL;
    while (slow) {
        ListNode *next = slow->next;
        slow->next = prev;
        prev = slow;
        slow = next;
    }

    ListNode *left = head;
    ListNode *right = prev;
    while (right) {
        if (left->val != right->val) return 0;
        left = left->next;
        right = right->next;
    }
    return 1;
}`,
  },
  {
    id: "c75-invert-binary-tree",
    title: "Invert binary tree",
    domain: "dsa",
    track: "Trees",
    language: "C",
    category: "trees",
    prompt: "Recursively swap every left and right child in a binary tree.",
    shikiLang: "c",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["struct pointers", "recursion", "swapping"],
    code: String.raw`typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode *invert_tree(TreeNode *root) {
    if (!root) {
        return NULL;
    }

    TreeNode *temp = root->left;
    root->left = invert_tree(root->right);
    root->right = invert_tree(temp);
    return root;
}`,
  },
  {
    id: "c75-maximum-depth-binary-tree",
    title: "Maximum depth of binary tree",
    domain: "dsa",
    track: "Trees",
    language: "C",
    category: "trees",
    prompt: "Compute the maximum depth of a binary tree from root to the farthest leaf.",
    shikiLang: "c",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion", "struct pointers", "ternary expressions"],
    code: String.raw`typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int max_depth(TreeNode *root) {
    if (!root) {
        return 0;
    }

    int left_depth = max_depth(root->left);
    int right_depth = max_depth(root->right);
    return 1 + (left_depth > right_depth ? left_depth : right_depth);
}`,
  },
  {
    id: "c75-same-tree",
    title: "Same tree",
    domain: "dsa",
    track: "Trees",
    language: "C",
    category: "trees",
    prompt: "Check whether two binary trees are structurally identical with the same node values.",
    shikiLang: "c",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion", "boolean logic", "struct pointers"],
    code: String.raw`typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int is_same_tree(TreeNode *p, TreeNode *q) {
    if (!p && !q) {
        return 1;
    }
    if (!p || !q || p->val != q->val) {
        return 0;
    }
    return is_same_tree(p->left, q->left) && is_same_tree(p->right, q->right);
}`,
  },
  {
    id: "c75-lowest-common-ancestor-bst",
    title: "Lowest common ancestor of a BST",
    domain: "dsa",
    track: "Trees",
    language: "C",
    category: "trees",
    prompt: "Find the lowest common ancestor of two nodes in a binary search tree.",
    shikiLang: "c",
    optimality: "O(h) time, O(1) space",
    typingFocus: ["BST invariants", "while loops", "struct pointers"],
    code: String.raw`typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode *lowest_common_ancestor(TreeNode *root, int p, int q) {
    TreeNode *node = root;

    while (node) {
        if (p < node->val && q < node->val) {
            node = node->left;
        } else if (p > node->val && q > node->val) {
            node = node->right;
        } else {
            return node;
        }
    }
    return NULL;
}`,
  },
  {
    id: "c75-validate-binary-search-tree",
    title: "Validate binary search tree",
    domain: "dsa",
    track: "Trees",
    language: "C",
    category: "trees",
    prompt: "Check whether a binary tree satisfies the binary search tree ordering property.",
    shikiLang: "c",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion with bounds", "long integers", "struct pointers"],
    code: String.raw`#include <limits.h>

typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

static int validate(TreeNode *node, long lower, long upper) {
    if (!node) {
        return 1;
    }
    if (node->val <= lower || node->val >= upper) {
        return 0;
    }
    return validate(node->left, lower, node->val) &&
           validate(node->right, node->val, upper);
}

int is_valid_bst(TreeNode *root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,
  },
  {
    id: "c75-implement-trie-insert-search",
    title: "Implement trie (insert and search)",
    domain: "dsa",
    track: "Tries",
    language: "C",
    category: "tries",
    prompt: "Implement insert and search for a trie storing lowercase words.",
    shikiLang: "c",
    optimality: "O(len) time per operation, O(alphabet * nodes) space",
    typingFocus: ["struct arrays", "recursion-free loops", "pointer allocation"],
    code: String.raw`#include <stdlib.h>

typedef struct TrieNode {
    struct TrieNode *children[26];
    int is_end;
} TrieNode;

TrieNode *trie_create(void) {
    TrieNode *node = calloc(1, sizeof(TrieNode));
    return node;
}

void trie_insert(TrieNode *root, const char *word) {
    TrieNode *node = root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!node->children[idx]) {
            node->children[idx] = trie_create();
        }
        node = node->children[idx];
    }
    node->is_end = 1;
}

int trie_search(TrieNode *root, const char *word) {
    TrieNode *node = root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!node->children[idx]) {
            return 0;
        }
        node = node->children[idx];
    }
    return node->is_end;
}`,
  },
  {
    id: "c75-kth-largest-element-in-array",
    title: "Kth largest element in an array",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C",
    category: "heaps",
    prompt: "Find the kth largest element in an unsorted array using a min-heap of size k.",
    shikiLang: "c",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["heap sift operations", "array indexing", "swapping"],
    code: String.raw`static void sift_down(int *heap, int size, int i) {
    while (1) {
        int smallest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < size && heap[left] < heap[smallest]) smallest = left;
        if (right < size && heap[right] < heap[smallest]) smallest = right;
        if (smallest == i) break;
        int tmp = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = tmp;
        i = smallest;
    }
}

int find_kth_largest(const int *nums, int n, int k) {
    int heap[10000];
    int size = 0;

    for (int i = 0; i < n; i++) {
        if (size < k) {
            heap[size++] = nums[i];
            if (size == k) {
                for (int j = size / 2 - 1; j >= 0; j--) sift_down(heap, size, j);
            }
        } else if (nums[i] > heap[0]) {
            heap[0] = nums[i];
            sift_down(heap, size, 0);
        }
    }
    return heap[0];
}`,
  },
  {
    id: "c75-last-stone-weight",
    title: "Last stone weight",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C",
    category: "heaps",
    prompt: "Repeatedly smash the two heaviest stones together until at most one stone remains.",
    shikiLang: "c",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["max-heap logic", "sorting", "simulation loops"],
    code: String.raw`static int cmp_desc(const void *a, const void *b) {
    return (*(const int *)b) - (*(const int *)a);
}

int last_stone_weight(int *stones, int n) {
    while (n > 1) {
        qsort(stones, n, sizeof(int), cmp_desc);
        int diff = stones[0] - stones[1];
        n -= 2;
        if (diff > 0) {
            stones[n] = diff;
            n++;
        }
    }
    return n == 1 ? stones[0] : 0;
}`,
  },
  {
    id: "c75-subsets",
    title: "Subsets",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Generate all possible subsets of a set of distinct integers.",
    shikiLang: "c",
    optimality: "O(2^n) time, O(n) space",
    typingFocus: ["backtracking", "recursion", "array copying"],
    code: String.raw`static void backtrack(const int *nums, int n, int start,
                       int *current, int depth,
                       int result[][20], int *sizes, int *count) {
    for (int i = 0; i < depth; i++) result[*count][i] = current[i];
    sizes[*count] = depth;
    (*count)++;

    for (int i = start; i < n; i++) {
        current[depth] = nums[i];
        backtrack(nums, n, i + 1, current, depth + 1, result, sizes, count);
    }
}

int subsets(const int *nums, int n, int result[][20], int *sizes) {
    int current[20];
    int count = 0;
    backtrack(nums, n, 0, current, 0, result, sizes, &count);
    return count;
}`,
  },
  {
    id: "c75-combination-sum",
    title: "Combination sum",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Find all unique combinations of candidates that sum to a target, reusing values freely.",
    shikiLang: "c",
    optimality: "O(2^target) worst case time, O(target) space",
    typingFocus: ["backtracking", "recursion", "pruning"],
    code: String.raw`static void combo(const int *cands, int n, int start, int remaining,
                   int *current, int depth,
                   int result[][20], int *sizes, int *count) {
    if (remaining == 0) {
        for (int i = 0; i < depth; i++) result[*count][i] = current[i];
        sizes[*count] = depth;
        (*count)++;
        return;
    }
    for (int i = start; i < n; i++) {
        if (cands[i] > remaining) continue;
        current[depth] = cands[i];
        combo(cands, n, i, remaining - cands[i], current, depth + 1, result, sizes, count);
    }
}

int combination_sum(const int *candidates, int n, int target,
                     int result[][20], int *sizes) {
    int current[20];
    int count = 0;
    combo(candidates, n, 0, target, current, 0, result, sizes, &count);
    return count;
}`,
  },
  {
    id: "c75-permutations",
    title: "Permutations",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Generate all permutations of a list of distinct integers.",
    shikiLang: "c",
    optimality: "O(n!) time, O(n) space",
    typingFocus: ["backtracking", "swapping", "recursion"],
    code: String.raw`static void permute_helper(int *nums, int n, int start,
                           int result[][10], int *count) {
    if (start == n) {
        for (int i = 0; i < n; i++) result[*count][i] = nums[i];
        (*count)++;
        return;
    }
    for (int i = start; i < n; i++) {
        int tmp = nums[start];
        nums[start] = nums[i];
        nums[i] = tmp;

        permute_helper(nums, n, start + 1, result, count);

        tmp = nums[start];
        nums[start] = nums[i];
        nums[i] = tmp;
    }
}

int permute(int *nums, int n, int result[][10]) {
    int count = 0;
    permute_helper(nums, n, 0, result, &count);
    return count;
}`,
  },
  {
    id: "c75-word-search",
    title: "Word search",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Determine whether a word can be traced through adjacent cells in a letter grid.",
    shikiLang: "c",
    optimality: "O(rows * cols * 4^len) time, O(len) space",
    typingFocus: ["grid recursion", "backtracking", "bounds checks"],
    code: String.raw`static int exists_from(char grid[][10], int rows, int cols,
                        int r, int c, const char *word, int idx) {
    if (!word[idx]) return 1;
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != word[idx]) {
        return 0;
    }

    char saved = grid[r][c];
    grid[r][c] = '#';

    int found = exists_from(grid, rows, cols, r + 1, c, word, idx + 1) ||
                exists_from(grid, rows, cols, r - 1, c, word, idx + 1) ||
                exists_from(grid, rows, cols, r, c + 1, word, idx + 1) ||
                exists_from(grid, rows, cols, r, c - 1, word, idx + 1);

    grid[r][c] = saved;
    return found;
}

int word_exists(char grid[][10], int rows, int cols, const char *word) {
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (exists_from(grid, rows, cols, r, c, word, 0)) {
                return 1;
            }
        }
    }
    return 0;
}`,
  },
  {
    id: "c75-letter-combinations-phone-number",
    title: "Letter combinations of a phone number",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Generate every letter combination a phone-keypad digit string could represent.",
    shikiLang: "c",
    optimality: "O(4^n * n) time, O(n) space",
    typingFocus: ["lookup tables", "backtracking", "string building"],
    code: String.raw`static const char *KEYS[10] = {
    "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
};

static void combine(const char *digits, int idx, char *current,
                     char result[][5], int *count) {
    if (!digits[idx]) {
        current[idx] = '\0';
        strcpy(result[*count], current);
        (*count)++;
        return;
    }

    const char *letters = KEYS[digits[idx] - '0'];
    for (int i = 0; letters[i]; i++) {
        current[idx] = letters[i];
        combine(digits, idx + 1, current, result, count);
    }
}

int letter_combinations(const char *digits, char result[][5]) {
    if (!digits[0]) return 0;
    char current[5];
    int count = 0;
    combine(digits, 0, current, result, &count);
    return count;
}`,
  },
  {
    id: "c75-n-queens-count",
    title: "N-Queens (count solutions)",
    domain: "dsa",
    track: "Backtracking",
    language: "C",
    category: "backtracking",
    prompt: "Count the number of ways to place n non-attacking queens on an n by n board.",
    shikiLang: "c",
    optimality: "O(n!) worst case time, O(n) space",
    typingFocus: ["backtracking", "diagonal checks", "recursion"],
    code: String.raw`static int is_safe(const int *cols, int row, int col) {
    for (int prev = 0; prev < row; prev++) {
        if (cols[prev] == col ||
            cols[prev] - prev == col - row ||
            cols[prev] + prev == col + row) {
            return 0;
        }
    }
    return 1;
}

static int solve(int *cols, int row, int n) {
    if (row == n) return 1;

    int total = 0;
    for (int col = 0; col < n; col++) {
        if (is_safe(cols, row, col)) {
            cols[row] = col;
            total += solve(cols, row + 1, n);
        }
    }
    return total;
}

int total_n_queens(int n) {
    int cols[20];
    return solve(cols, 0, n);
}`,
  },
  {
    id: "c75-number-of-islands",
    title: "Number of islands",
    domain: "dsa",
    track: "Graphs",
    language: "C",
    category: "graphs",
    prompt: "Count the number of connected islands of '1' cells in a 2D grid.",
    shikiLang: "c",
    optimality: "O(rows * cols) time, O(rows * cols) space",
    typingFocus: ["grid DFS", "recursion", "in-place marking"],
    code: String.raw`static void sink(char grid[][300], int rows, int cols, int r, int c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') {
        return;
    }
    grid[r][c] = '0';
    sink(grid, rows, cols, r + 1, c);
    sink(grid, rows, cols, r - 1, c);
    sink(grid, rows, cols, r, c + 1);
    sink(grid, rows, cols, r, c - 1);
}

int num_islands(char grid[][300], int rows, int cols) {
    int count = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                sink(grid, rows, cols, r, c);
            }
        }
    }
    return count;
}`,
  },
  {
    id: "c75-course-schedule",
    title: "Course schedule",
    domain: "dsa",
    track: "Graphs",
    language: "C",
    category: "graphs",
    prompt: "Determine whether all courses can be finished given prerequisite pairs, detecting cycles.",
    shikiLang: "c",
    optimality: "O(V + E) time, O(V + E) space",
    typingFocus: ["adjacency matrix", "DFS states", "cycle detection"],
    code: String.raw`#define MAX_COURSES 200

static int adj[MAX_COURSES][MAX_COURSES];
static int state[MAX_COURSES]; /* 0 = unvisited, 1 = visiting, 2 = done */

static int has_cycle(int node, int n) {
    state[node] = 1;
    for (int next = 0; next < n; next++) {
        if (adj[node][next]) {
            if (state[next] == 1) return 1;
            if (state[next] == 0 && has_cycle(next, n)) return 1;
        }
    }
    state[node] = 2;
    return 0;
}

int can_finish(int num_courses, int prereqs[][2], int num_prereqs) {
    for (int i = 0; i < num_courses; i++) {
        state[i] = 0;
        for (int j = 0; j < num_courses; j++) adj[i][j] = 0;
    }
    for (int i = 0; i < num_prereqs; i++) {
        adj[prereqs[i][1]][prereqs[i][0]] = 1;
    }

    for (int i = 0; i < num_courses; i++) {
        if (state[i] == 0 && has_cycle(i, num_courses)) {
            return 0;
        }
    }
    return 1;
}`,
  },
  {
    id: "c75-number-of-connected-components",
    title: "Number of connected components",
    domain: "dsa",
    track: "Graphs",
    language: "C",
    category: "graphs",
    prompt: "Count connected components in an undirected graph given as an edge list, using union-find.",
    shikiLang: "c",
    optimality: "O(E * alpha(V)) time, O(V) space",
    typingFocus: ["union-find", "path compression", "arrays"],
    code: String.raw`static int find(int *parent, int x) {
    while (parent[x] != x) {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    return x;
}

int count_components(int n, int edges[][2], int num_edges) {
    int parent[10000];
    for (int i = 0; i < n; i++) parent[i] = i;

    int components = n;
    for (int i = 0; i < num_edges; i++) {
        int ra = find(parent, edges[i][0]);
        int rb = find(parent, edges[i][1]);
        if (ra != rb) {
            parent[ra] = rb;
            components--;
        }
    }
    return components;
}`,
  },
  {
    id: "c75-rotting-oranges",
    title: "Rotting oranges",
    domain: "dsa",
    track: "Graphs",
    language: "C",
    category: "graphs",
    prompt: "Simulate rot spreading through a grid of oranges and find the minutes until none are fresh.",
    shikiLang: "c",
    optimality: "O(rows * cols) time, O(rows * cols) space",
    typingFocus: ["BFS with a queue", "array-based queues", "grid traversal"],
    code: String.raw`int oranges_rotting(int grid[][10], int rows, int cols) {
    int queue[100][2];
    int head = 0, tail = 0;
    int fresh = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) {
                queue[tail][0] = r;
                queue[tail][1] = c;
                tail++;
            } else if (grid[r][c] == 1) {
                fresh++;
            }
        }
    }

    int minutes = 0;
    int dr[4] = {1, -1, 0, 0};
    int dc[4] = {0, 0, 1, -1};

    while (head < tail && fresh > 0) {
        int count = tail - head;
        for (int i = 0; i < count; i++) {
            int r = queue[head][0];
            int c = queue[head][1];
            head++;
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue[tail][0] = nr;
                    queue[tail][1] = nc;
                    tail++;
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
  },
  {
    id: "c75-climbing-stairs",
    title: "Climbing stairs",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Count the number of distinct ways to climb n stairs taking 1 or 2 steps at a time.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "loops", "fibonacci-style recurrence"],
    code: String.raw`int climb_stairs(int n) {
    if (n <= 2) {
        return n;
    }

    int prev2 = 1;
    int prev1 = 2;
    int current = 0;

    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
}`,
  },
  {
    id: "c75-house-robber",
    title: "House robber",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Find the maximum money that can be robbed from houses in a row without robbing two adjacent ones.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "max functions", "loops"],
    code: String.raw`int rob(const int *nums, int n) {
    int prev2 = 0;
    int prev1 = 0;

    for (int i = 0; i < n; i++) {
        int take = prev2 + nums[i];
        int skip = prev1;
        int current = take > skip ? take : skip;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
  },
  {
    id: "c75-longest-palindromic-substring",
    title: "Longest palindromic substring",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "strings",
    prompt: "Find the longest palindromic substring within a string by expanding around each center.",
    shikiLang: "c",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand around center", "substring bounds", "string copying"],
    code: String.raw`#include <string.h>

static int expand(const char *s, int len, int left, int right) {
    while (left >= 0 && right < len && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

void longest_palindrome(const char *s, char *out) {
    int len = (int)strlen(s);
    int start = 0, best_len = 0;

    for (int i = 0; i < len; i++) {
        int len1 = expand(s, len, i, i);
        int len2 = expand(s, len, i, i + 1);
        int local_best = len1 > len2 ? len1 : len2;
        if (local_best > best_len) {
            best_len = local_best;
            start = i - (local_best - 1) / 2;
        }
    }

    memcpy(out, s + start, best_len);
    out[best_len] = '\0';
}`,
  },
  {
    id: "c75-decode-ways",
    title: "Decode ways",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Count the number of ways to decode a digit string into letters where A=1 ... Z=26.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "digit parsing", "conditionals"],
    code: String.raw`#include <string.h>

int num_decodings(const char *s) {
    int n = (int)strlen(s);
    if (n == 0 || s[0] == '0') return 0;

    int prev2 = 1;
    int prev1 = 1;

    for (int i = 1; i < n; i++) {
        int current = 0;
        if (s[i] != '0') {
            current += prev1;
        }
        int two_digit = (s[i - 1] - '0') * 10 + (s[i] - '0');
        if (two_digit >= 10 && two_digit <= 26) {
            current += prev2;
        }
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
  },
  {
    id: "c75-coin-change",
    title: "Coin change",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Find the fewest coins needed to make up a target amount, or report it is impossible.",
    shikiLang: "c",
    optimality: "O(amount * coins) time, O(amount) space",
    typingFocus: ["bottom-up DP", "array initialization", "min functions"],
    code: String.raw`int coin_change(const int *coins, int num_coins, int amount) {
    int dp[10001];
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        dp[i] = amount + 1;
    }

    for (int i = 1; i <= amount; i++) {
        for (int c = 0; c < num_coins; c++) {
            if (coins[c] <= i && dp[i - coins[c]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[c]] + 1;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
  },
  {
    id: "c75-maximum-product-subarray",
    title: "Maximum product subarray",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Find the contiguous subarray with the largest product within an integer array.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running max/min", "sign handling", "single pass"],
    code: String.raw`int max_product(const int *nums, int n) {
    int max_here = nums[0];
    int min_here = nums[0];
    int best = nums[0];

    for (int i = 1; i < n; i++) {
        if (nums[i] < 0) {
            int tmp = max_here;
            max_here = min_here;
            min_here = tmp;
        }

        max_here = nums[i] > max_here * nums[i] ? nums[i] : max_here * nums[i];
        min_here = nums[i] < min_here * nums[i] ? nums[i] : min_here * nums[i];

        if (max_here > best) best = max_here;
    }
    return best;
}`,
  },
  {
    id: "c75-longest-increasing-subsequence",
    title: "Longest increasing subsequence",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Find the length of the longest strictly increasing subsequence in an integer array.",
    shikiLang: "c",
    optimality: "O(n^2) time, O(n) space",
    typingFocus: ["bottom-up DP", "nested loops", "max tracking"],
    code: String.raw`int length_of_lis(const int *nums, int n) {
    int dp[2500];
    int best = 0;

    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > best) best = dp[i];
    }
    return best;
}`,
  },
  {
    id: "c75-word-break",
    title: "Word break",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Determine whether a string can be segmented into a sequence of words from a dictionary.",
    shikiLang: "c",
    optimality: "O(n^2 * len) time, O(n) space",
    typingFocus: ["bottom-up DP", "substring comparison", "nested loops"],
    code: String.raw`#include <string.h>

int word_break(const char *s, const char **dict, int dict_size) {
    int n = (int)strlen(s);
    int dp[301] = {0};
    dp[0] = 1;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (!dp[j]) continue;
            int word_len = i - j;
            for (int w = 0; w < dict_size; w++) {
                if ((int)strlen(dict[w]) == word_len &&
                    strncmp(s + j, dict[w], word_len) == 0) {
                    dp[i] = 1;
                    break;
                }
            }
            if (dp[i]) break;
        }
    }
    return dp[n];
}`,
  },
  {
    id: "c75-unique-paths",
    title: "Unique paths",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Count the number of unique paths from the top-left to bottom-right of a grid moving only right or down.",
    shikiLang: "c",
    optimality: "O(rows * cols) time, O(cols) space",
    typingFocus: ["2D DP compressed to 1D", "nested loops", "array reuse"],
    code: String.raw`int unique_paths(int rows, int cols) {
    int dp[101];
    for (int c = 0; c < cols; c++) {
        dp[c] = 1;
    }

    for (int r = 1; r < rows; r++) {
        for (int c = 1; c < cols; c++) {
            dp[c] += dp[c - 1];
        }
    }
    return dp[cols - 1];
}`,
  },
  {
    id: "c75-longest-common-subsequence",
    title: "Longest common subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C",
    category: "dp",
    prompt: "Find the length of the longest subsequence shared between two strings.",
    shikiLang: "c",
    optimality: "O(n * m) time, O(n * m) space",
    typingFocus: ["2D DP tables", "nested loops", "string indexing"],
    code: String.raw`#include <string.h>

int longest_common_subsequence(const char *a, const char *b) {
    int n = (int)strlen(a);
    int m = (int)strlen(b);
    static int dp[1001][1001];

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
            }
        }
    }
    return dp[n][m];
}`,
  },
  {
    id: "c75-maximum-subarray",
    title: "Maximum subarray",
    domain: "dsa",
    track: "Greedy",
    language: "C",
    category: "arrays",
    prompt: "Find the contiguous subarray with the largest sum using Kadane's algorithm.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running sums", "greedy resets", "single pass"],
    code: String.raw`int max_sub_array(const int *nums, int n) {
    int best = nums[0];
    int current = nums[0];

    for (int i = 1; i < n; i++) {
        current = nums[i] > current + nums[i] ? nums[i] : current + nums[i];
        if (current > best) best = current;
    }
    return best;
}`,
  },
  {
    id: "c75-jump-game",
    title: "Jump game",
    domain: "dsa",
    track: "Greedy",
    language: "C",
    category: "arrays",
    prompt: "Determine whether it's possible to reach the last index given the max jump distance at each position.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy reachability", "running maxima", "single pass"],
    code: String.raw`int can_jump(const int *nums, int n) {
    int reachable = 0;

    for (int i = 0; i < n; i++) {
        if (i > reachable) {
            return 0;
        }
        int furthest = i + nums[i];
        if (furthest > reachable) {
            reachable = furthest;
        }
    }
    return 1;
}`,
  },
  {
    id: "c75-gas-station",
    title: "Gas station",
    domain: "dsa",
    track: "Greedy",
    language: "C",
    category: "arrays",
    prompt: "Find the starting gas station index that allows completing a circular route, or report impossible.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy accumulation", "circular arrays", "reset logic"],
    code: String.raw`int can_complete_circuit(const int *gas, const int *cost, int n) {
    int total = 0;
    int tank = 0;
    int start = 0;

    for (int i = 0; i < n; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
  },
  {
    id: "c75-insert-interval",
    title: "Insert interval",
    domain: "dsa",
    track: "Intervals",
    language: "C",
    category: "intervals",
    prompt: "Insert a new interval into a sorted, non-overlapping list of intervals, merging as needed.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["interval merging", "array building", "conditionals"],
    code: String.raw`int insert_interval(int intervals[][2], int n, int new_interval[2], int result[][2]) {
    int i = 0;
    int count = 0;

    while (i < n && intervals[i][1] < new_interval[0]) {
        result[count][0] = intervals[i][0];
        result[count][1] = intervals[i][1];
        count++;
        i++;
    }

    while (i < n && intervals[i][0] <= new_interval[1]) {
        new_interval[0] = new_interval[0] < intervals[i][0] ? new_interval[0] : intervals[i][0];
        new_interval[1] = new_interval[1] > intervals[i][1] ? new_interval[1] : intervals[i][1];
        i++;
    }
    result[count][0] = new_interval[0];
    result[count][1] = new_interval[1];
    count++;

    while (i < n) {
        result[count][0] = intervals[i][0];
        result[count][1] = intervals[i][1];
        count++;
        i++;
    }
    return count;
}`,
  },
  {
    id: "c75-merge-intervals",
    title: "Merge intervals",
    domain: "dsa",
    track: "Intervals",
    language: "C",
    category: "intervals",
    prompt: "Merge all overlapping intervals in a collection of intervals.",
    shikiLang: "c",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["sorting comparators", "interval merging", "loops"],
    code: String.raw`static int cmp_interval(const void *a, const void *b) {
    const int *ia = (const int *)a;
    const int *ib = (const int *)b;
    return ia[0] - ib[0];
}

int merge_intervals(int intervals[][2], int n, int result[][2]) {
    qsort(intervals, n, sizeof(intervals[0]), cmp_interval);

    int count = 0;
    result[0][0] = intervals[0][0];
    result[0][1] = intervals[0][1];
    count = 1;

    for (int i = 1; i < n; i++) {
        if (intervals[i][0] <= result[count - 1][1]) {
            if (intervals[i][1] > result[count - 1][1]) {
                result[count - 1][1] = intervals[i][1];
            }
        } else {
            result[count][0] = intervals[i][0];
            result[count][1] = intervals[i][1];
            count++;
        }
    }
    return count;
}`,
  },
  {
    id: "c75-non-overlapping-intervals",
    title: "Non-overlapping intervals",
    domain: "dsa",
    track: "Intervals",
    language: "C",
    category: "intervals",
    prompt: "Find the minimum number of intervals to remove so the rest do not overlap.",
    shikiLang: "c",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["greedy by end time", "sorting", "single pass"],
    code: String.raw`static int cmp_by_end(const void *a, const void *b) {
    const int *ia = (const int *)a;
    const int *ib = (const int *)b;
    return ia[1] - ib[1];
}

int erase_overlap_intervals(int intervals[][2], int n) {
    qsort(intervals, n, sizeof(intervals[0]), cmp_by_end);

    int removed = 0;
    int prev_end = intervals[0][1];

    for (int i = 1; i < n; i++) {
        if (intervals[i][0] < prev_end) {
            removed++;
        } else {
            prev_end = intervals[i][1];
        }
    }
    return removed;
}`,
  },
  {
    id: "c75-rotate-image",
    title: "Rotate image",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C",
    category: "matrices",
    prompt: "Rotate an n by n matrix 90 degrees clockwise in place.",
    shikiLang: "c",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["matrix transpose", "in-place swaps", "nested loops"],
    code: String.raw`void rotate_image(int matrix[][20], int n) {
    for (int r = 0; r < n; r++) {
        for (int c = r + 1; c < n; c++) {
            int tmp = matrix[r][c];
            matrix[r][c] = matrix[c][r];
            matrix[c][r] = tmp;
        }
    }

    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n / 2; c++) {
            int tmp = matrix[r][c];
            matrix[r][c] = matrix[r][n - 1 - c];
            matrix[r][n - 1 - c] = tmp;
        }
    }
}`,
  },
  {
    id: "c75-spiral-matrix",
    title: "Spiral matrix",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C",
    category: "matrices",
    prompt: "Return all elements of a matrix in spiral order.",
    shikiLang: "c",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["boundary tracking", "while loops", "array indexing"],
    code: String.raw`int spiral_order(int matrix[][20], int rows, int cols, int *out) {
    int top = 0, bottom = rows - 1;
    int left = 0, right = cols - 1;
    int idx = 0;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) out[idx++] = matrix[top][c];
        top++;
        for (int r = top; r <= bottom; r++) out[idx++] = matrix[r][right];
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) out[idx++] = matrix[bottom][c];
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) out[idx++] = matrix[r][left];
            left++;
        }
    }
    return idx;
}`,
  },
  {
    id: "c75-set-matrix-zeroes",
    title: "Set matrix zeroes",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C",
    category: "matrices",
    prompt: "Set an entire row and column to zero wherever a zero appears in the matrix, in place.",
    shikiLang: "c",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["marker rows/columns", "nested loops", "in-place mutation"],
    code: String.raw`void set_zeroes(int matrix[][20], int rows, int cols) {
    int first_row_zero = 0;
    int first_col_zero = 0;

    for (int c = 0; c < cols; c++) if (matrix[0][c] == 0) first_row_zero = 1;
    for (int r = 0; r < rows; r++) if (matrix[r][0] == 0) first_col_zero = 1;

    for (int r = 1; r < rows; r++) {
        for (int c = 1; c < cols; c++) {
            if (matrix[r][c] == 0) {
                matrix[r][0] = 0;
                matrix[0][c] = 0;
            }
        }
    }

    for (int r = 1; r < rows; r++) {
        for (int c = 1; c < cols; c++) {
            if (matrix[r][0] == 0 || matrix[0][c] == 0) {
                matrix[r][c] = 0;
            }
        }
    }

    if (first_row_zero) for (int c = 0; c < cols; c++) matrix[0][c] = 0;
    if (first_col_zero) for (int r = 0; r < rows; r++) matrix[r][0] = 0;
}`,
  },
  {
    id: "c75-happy-number",
    title: "Happy number",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C",
    category: "math",
    prompt: "Determine whether repeatedly summing the squares of a number's digits eventually reaches one.",
    shikiLang: "c",
    optimality: "O(log n) time per iteration, O(1) space",
    typingFocus: ["cycle detection", "digit extraction", "while loops"],
    code: String.raw`static int next_value(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

int is_happy(int n) {
    int slow = n;
    int fast = next_value(n);

    while (fast != 1 && slow != fast) {
        slow = next_value(slow);
        fast = next_value(next_value(fast));
    }
    return fast == 1;
}`,
  },
  {
    id: "c75-single-number",
    title: "Single number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "Find the element that appears once while every other element appears exactly twice.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor accumulation", "single pass", "bitwise operators"],
    code: String.raw`int single_number(const int *nums, int n) {
    int result = 0;
    for (int i = 0; i < n; i++) {
        result ^= nums[i];
    }
    return result;
}`,
  },
  {
    id: "c75-number-of-1-bits",
    title: "Number of 1 bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "Count the number of set bits in the binary representation of an unsigned integer.",
    shikiLang: "c",
    optimality: "O(set bits) time, O(1) space",
    typingFocus: ["bit tricks", "unsigned integers", "while loops"],
    code: String.raw`int hamming_weight(unsigned int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
  },
  {
    id: "c75-counting-bits",
    title: "Counting bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "For every number from 0 to n, compute the number of set bits using previously computed results.",
    shikiLang: "c",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dynamic programming", "bit shifts", "array building"],
    code: String.raw`void count_bits(int n, int *out) {
    out[0] = 0;
    for (int i = 1; i <= n; i++) {
        out[i] = out[i >> 1] + (i & 1);
    }
}`,
  },
  {
    id: "c75-reverse-bits",
    title: "Reverse bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "Reverse the bits of a 32-bit unsigned integer.",
    shikiLang: "c",
    optimality: "O(1) time (32 iterations), O(1) space",
    typingFocus: ["bit shifts", "masking", "fixed loops"],
    code: String.raw`unsigned int reverse_bits(unsigned int n) {
    unsigned int result = 0;

    for (int i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n & 1);
        n >>= 1;
    }
    return result;
}`,
  },
  {
    id: "c75-missing-number",
    title: "Missing number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "Find the missing number from an array containing n distinct numbers in the range 0 to n.",
    shikiLang: "c",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor tricks", "single pass", "loops"],
    code: String.raw`int missing_number(const int *nums, int n) {
    int result = n;

    for (int i = 0; i < n; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}`,
  },
  {
    id: "c75-sum-of-two-integers",
    title: "Sum of two integers",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C",
    category: "bit manipulation",
    prompt: "Add two integers without using the + or - operators, using bitwise operations only.",
    shikiLang: "c",
    optimality: "O(1) time (bounded by bit width), O(1) space",
    typingFocus: ["xor and carry", "bit shifts", "while loops"],
    code: String.raw`int get_sum(int a, int b) {
    while (b != 0) {
        unsigned int carry = (unsigned int)(a & b) << 1;
        a = a ^ b;
        b = (int)carry;
    }
    return a;
}`,
  },
];
