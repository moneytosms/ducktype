import type { Snippet } from "@/types/snippet";

export const dsaJavaSnippets: Snippet[] = [
  {
    id: "java75-two-sum",
    title: "Two Sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Find indices of two numbers in an array that add up to a target.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["hashmap", "for loop", "array index"],
    code: String.raw`public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) {
            return new int[] { seen.get(need), i };
        }
        seen.put(nums[i], i);
    }
    return new int[0];
}`,
  },
  {
    id: "java75-contains-duplicate",
    title: "Contains Duplicate",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Determine if any value appears at least twice in an array.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["hashset", "enhanced for", "boolean return"],
    code: String.raw`public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int n : nums) {
        if (!seen.add(n)) {
            return true;
        }
    }
    return false;
}`,
  },
  {
    id: "java75-valid-anagram",
    title: "Valid Anagram",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Check whether two strings are anagrams of each other.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["char arithmetic", "array counting"],
    code: String.raw`public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] counts = new int[26];
    for (int i = 0; i < s.length(); i++) {
        counts[s.charAt(i) - 'a']++;
        counts[t.charAt(i) - 'a']--;
    }
    for (int c : counts) {
        if (c != 0) return false;
    }
    return true;
}`,
  },
  {
    id: "java75-group-anagrams",
    title: "Group Anagrams",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Group a list of strings so anagrams of each other end up together.",
    shikiLang: "java",
    optimality: "O(n * k log k) time, O(n * k) space",
    typingFocus: ["hashmap of lists", "char array sort", "streams"],
    code: String.raw`public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(groups.values());
}`,
  },
  {
    id: "java75-top-k-frequent-elements",
    title: "Top K Frequent Elements",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "bucket-sort",
    prompt: "Return the k most frequent elements in an array.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["bucket array", "list of lists", "nested loops"],
    code: String.raw`public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int n : nums) counts.merge(n, 1, Integer::sum);

    List<Integer>[] buckets = new List[nums.length + 1];
    for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
        int freq = e.getValue();
        if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
        buckets[freq].add(e.getKey());
    }

    int[] result = new int[k];
    int idx = 0;
    for (int freq = buckets.length - 1; freq >= 0 && idx < k; freq--) {
        if (buckets[freq] == null) continue;
        for (int n : buckets[freq]) {
            if (idx == k) break;
            result[idx++] = n;
        }
    }
    return result;
}`,
  },
  {
    id: "java75-product-except-self",
    title: "Product of Array Except Self",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "prefix-product",
    prompt: "Build an array where each element is the product of all others, without division.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) extra space",
    typingFocus: ["prefix pass", "suffix pass", "running product"],
    code: String.raw`public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
  },
  {
    id: "java75-valid-sudoku",
    title: "Valid Sudoku",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Check whether a 9x9 Sudoku board is valid so far, ignoring empty cells.",
    shikiLang: "java",
    optimality: "O(1) time and space for fixed 9x9 board",
    typingFocus: ["set arrays", "nested loops", "string keys"],
    code: String.raw`public boolean isValidSudoku(char[][] board) {
    Set<String> seen = new HashSet<>();
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char val = board[r][c];
            if (val == '.') continue;
            String row = "row" + r + val;
            String col = "col" + c + val;
            String box = "box" + (r / 3) + (c / 3) + val;
            if (!seen.add(row) || !seen.add(col) || !seen.add(box)) {
                return false;
            }
        }
    }
    return true;
}`,
  },
  {
    id: "java75-encode-decode-strings",
    title: "Encode and Decode Strings",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "design",
    prompt: "Design functions to encode a list of strings into one string and decode it back.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["string builder", "length prefix encoding", "substring parsing"],
    code: String.raw`public String encode(List<String> strs) {
    StringBuilder sb = new StringBuilder();
    for (String s : strs) {
        sb.append(s.length()).append('#').append(s);
    }
    return sb.toString();
}

public List<String> decode(String s) {
    List<String> result = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (s.charAt(j) != '#') j++;
        int len = Integer.parseInt(s.substring(i, j));
        result.add(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return result;
}`,
  },
  {
    id: "java75-longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Java",
    category: "hashing",
    prompt: "Find the length of the longest run of consecutive integers in an unsorted array.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["hashset", "while loop", "sequence start check"],
    code: String.raw`public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);

    int longest = 0;
    for (int n : set) {
        if (set.contains(n - 1)) continue;
        int length = 1;
        while (set.contains(n + length)) length++;
        longest = Math.max(longest, length);
    }
    return longest;
}`,
  },
  {
    id: "java75-valid-palindrome",
    title: "Valid Palindrome",
    domain: "dsa",
    track: "Two Pointers",
    language: "Java",
    category: "two-pointers",
    prompt: "Check if a string is a palindrome, ignoring non-alphanumeric characters and case.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "Character methods", "while loop"],
    code: String.raw`public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
  },
  {
    id: "java75-two-sum-ii-sorted",
    title: "Two Sum II (Sorted Input)",
    domain: "dsa",
    track: "Two Pointers",
    language: "Java",
    category: "two-pointers",
    prompt: "Find two numbers in a sorted array that add up to a target, returning 1-indexed positions.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "while loop", "array return"],
    code: String.raw`public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return new int[] { left + 1, right + 1 };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[0];
}`,
  },
  {
    id: "java75-three-sum",
    title: "3Sum",
    domain: "dsa",
    track: "Two Pointers",
    language: "Java",
    category: "two-pointers",
    prompt: "Find all unique triplets in an array that sum to zero.",
    shikiLang: "java",
    optimality: "O(n^2) time, O(1) extra space",
    typingFocus: ["sort", "two pointers", "duplicate skipping"],
    code: String.raw`public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                left++;
                while (left < right && nums[left] == nums[left - 1]) left++;
            }
        }
    }
    return result;
}`,
  },
  {
    id: "java75-container-with-most-water",
    title: "Container With Most Water",
    domain: "dsa",
    track: "Two Pointers",
    language: "Java",
    category: "two-pointers",
    prompt: "Find two lines that together with the x-axis form the container holding the most water.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointers", "Math.min", "area formula"],
    code: String.raw`public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int best = 0;
    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        best = Math.max(best, area);
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
    id: "java75-best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    domain: "dsa",
    track: "Sliding Window",
    language: "Java",
    category: "sliding-window",
    prompt: "Find the maximum profit from a single buy and sell of a stock given daily prices.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running min", "profit tracking", "for loop"],
    code: String.raw`public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int best = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        best = Math.max(best, price - minPrice);
    }
    return best;
}`,
  },
  {
    id: "java75-longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    domain: "dsa",
    track: "Sliding Window",
    language: "Java",
    category: "sliding-window",
    prompt: "Find the length of the longest substring without repeating characters.",
    shikiLang: "java",
    optimality: "O(n) time, O(min(n, charset)) space",
    typingFocus: ["hashmap window", "sliding pointers", "Math.max"],
    code: String.raw`public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
            left = lastSeen.get(c) + 1;
        }
        lastSeen.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}`,
  },
  {
    id: "java75-longest-repeating-char-replacement",
    title: "Longest Repeating Character Replacement",
    domain: "dsa",
    track: "Sliding Window",
    language: "Java",
    category: "sliding-window",
    prompt: "Find the longest substring achievable after replacing at most k characters with any letter.",
    shikiLang: "java",
    optimality: "O(n) time, O(26) space",
    typingFocus: ["frequency array", "window shrink condition", "max tracking"],
    code: String.raw`public int characterReplacement(String s, int k) {
    int[] counts = new int[26];
    int left = 0, maxCount = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        int idx = s.charAt(right) - 'A';
        counts[idx]++;
        maxCount = Math.max(maxCount, counts[idx]);
        while (right - left + 1 - maxCount > k) {
            counts[s.charAt(left) - 'A']--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}`,
  },
  {
    id: "java75-permutation-in-string",
    title: "Permutation in String",
    domain: "dsa",
    track: "Sliding Window",
    language: "Java",
    category: "sliding-window",
    prompt: "Check whether one string's permutation is a substring of another string.",
    shikiLang: "java",
    optimality: "O(n) time, O(26) space",
    typingFocus: ["fixed window", "array comparison", "Arrays.equals"],
    code: String.raw`public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] need = new int[26];
    int[] window = new int[26];
    for (char c : s1.toCharArray()) need[c - 'a']++;

    for (int i = 0; i < s2.length(); i++) {
        window[s2.charAt(i) - 'a']++;
        if (i >= s1.length()) {
            window[s2.charAt(i - s1.length()) - 'a']--;
        }
        if (Arrays.equals(need, window)) return true;
    }
    return false;
}`,
  },
  {
    id: "java75-minimum-window-substring",
    title: "Minimum Window Substring",
    domain: "dsa",
    track: "Sliding Window",
    language: "Java",
    category: "sliding-window",
    prompt: "Find the smallest substring of s containing every character of t.",
    shikiLang: "java",
    optimality: "O(n) time, O(charset) space",
    typingFocus: ["hashmap counts", "window expand/shrink", "have vs need"],
    code: String.raw`public String minWindow(String s, String t) {
    if (t.isEmpty()) return "";
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);

    Map<Character, Integer> window = new HashMap<>();
    int have = 0, required = need.size();
    int bestLen = Integer.MAX_VALUE, bestStart = 0;
    int left = 0;

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue()) {
            have++;
        }
        while (have == required) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestStart = left;
            }
            char leftChar = s.charAt(left);
            window.put(leftChar, window.get(leftChar) - 1);
            if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            left++;
        }
    }
    return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
}`,
  },
  {
    id: "java75-valid-parentheses",
    title: "Valid Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "Java",
    category: "stack",
    prompt: "Determine if a string of brackets is validly matched and nested.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["ArrayDeque", "switch statement", "push/pop"],
    code: String.raw`public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        switch (c) {
            case '(' -> stack.push(')');
            case '[' -> stack.push(']');
            case '{' -> stack.push('}');
            default -> {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
    }
    return stack.isEmpty();
}`,
  },
  {
    id: "java75-min-stack",
    title: "Min Stack",
    domain: "dsa",
    track: "Stack",
    language: "Java",
    category: "stack",
    prompt: "Design a stack that supports push, pop, top, and retrieving the minimum in O(1).",
    shikiLang: "java",
    optimality: "O(1) time per operation, O(n) space",
    typingFocus: ["two stacks", "class fields", "constructor"],
    code: String.raw`class MinStack {
    private final Deque<Integer> stack = new ArrayDeque<>();
    private final Deque<Integer> minStack = new ArrayDeque<>();

    public void push(int val) {
        stack.push(val);
        int currentMin = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(currentMin);
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
  },
  {
    id: "java75-evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    domain: "dsa",
    track: "Stack",
    language: "Java",
    category: "stack",
    prompt: "Evaluate an arithmetic expression given in reverse Polish (postfix) notation.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack", "switch on string", "integer division"],
    code: String.raw`public int evalRPN(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();
    for (String token : tokens) {
        switch (token) {
            case "+", "-", "*", "/" -> {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(switch (token) {
                    case "+" -> a + b;
                    case "-" -> a - b;
                    case "*" -> a * b;
                    default -> a / b;
                });
            }
            default -> stack.push(Integer.parseInt(token));
        }
    }
    return stack.pop();
}`,
  },
  {
    id: "java75-generate-parentheses",
    title: "Generate Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "Java",
    category: "backtracking",
    prompt: "Generate all combinations of well-formed parentheses for n pairs.",
    shikiLang: "java",
    optimality: "O(4^n / sqrt(n)) time, same space for output",
    typingFocus: ["recursive helper", "StringBuilder", "backtracking"],
    code: String.raw`public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}

private void backtrack(List<String> result, StringBuilder sb, int open, int close, int n) {
    if (sb.length() == 2 * n) {
        result.add(sb.toString());
        return;
    }
    if (open < n) {
        sb.append('(');
        backtrack(result, sb, open + 1, close, n);
        sb.deleteCharAt(sb.length() - 1);
    }
    if (close < open) {
        sb.append(')');
        backtrack(result, sb, open, close + 1, n);
        sb.deleteCharAt(sb.length() - 1);
    }
}`,
  },
  {
    id: "java75-daily-temperatures",
    title: "Daily Temperatures",
    domain: "dsa",
    track: "Stack",
    language: "Java",
    category: "monotonic-stack",
    prompt: "For each day, find how many days until a warmer temperature.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack", "index stack", "while loop"],
    code: String.raw`public int[] dailyTemperatures(int[] temperatures) {
    int[] result = new int[temperatures.length];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevIdx = stack.pop();
            result[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }
    return result;
}`,
  },
  {
    id: "java75-binary-search",
    title: "Binary Search",
    domain: "dsa",
    track: "Binary Search",
    language: "Java",
    category: "binary-search",
    prompt: "Search for a target value in a sorted array and return its index.",
    shikiLang: "java",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["mid calculation", "while loop", "bounds update"],
    code: String.raw`public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
  },
  {
    id: "java75-search-2d-matrix",
    title: "Search a 2D Matrix",
    domain: "dsa",
    track: "Binary Search",
    language: "Java",
    category: "binary-search",
    prompt: "Search for a target in a row and column sorted matrix treated as flattened sorted array.",
    shikiLang: "java",
    optimality: "O(log(m*n)) time, O(1) space",
    typingFocus: ["index math", "row/col conversion", "binary search"],
    code: String.raw`public boolean searchMatrix(int[][] matrix, int target) {
    int rows = matrix.length, cols = matrix[0].length;
    int left = 0, right = rows * cols - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int value = matrix[mid / cols][mid % cols];
        if (value == target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}`,
  },
  {
    id: "java75-koko-eating-bananas",
    title: "Koko Eating Bananas",
    domain: "dsa",
    track: "Binary Search",
    language: "Java",
    category: "binary-search-on-answer",
    prompt: "Find the minimum eating speed so Koko can finish all banana piles within h hours.",
    shikiLang: "java",
    optimality: "O(n log max(piles)) time, O(1) space",
    typingFocus: ["binary search on answer", "ceiling division", "helper function"],
    code: String.raw`public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = Arrays.stream(piles).max().getAsInt();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (hoursNeeded(piles, mid) <= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

private long hoursNeeded(int[] piles, int speed) {
    long hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;
    }
    return hours;
}`,
  },
  {
    id: "java75-search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Java",
    category: "binary-search",
    prompt: "Search a target in a rotated sorted array in logarithmic time.",
    shikiLang: "java",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["sorted half detection", "nested conditionals", "binary search"],
    code: String.raw`public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
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
    id: "java75-find-minimum-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Java",
    category: "binary-search",
    prompt: "Find the minimum element in a rotated sorted array with no duplicates.",
    shikiLang: "java",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["binary search", "comparison to right bound"],
    code: String.raw`public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;
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
    id: "java75-reverse-linked-list",
    title: "Reverse Linked List",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "linked-list",
    prompt: "Reverse a singly linked list in place.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["node pointers", "while loop", "pointer swap"],
    code: String.raw`public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
  },
  {
    id: "java75-merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "linked-list",
    prompt: "Merge two sorted linked lists into one sorted list.",
    shikiLang: "java",
    optimality: "O(n + m) time, O(1) space",
    typingFocus: ["dummy node", "while loop", "node linking"],
    code: String.raw`public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 != null ? list1 : list2;
    return dummy.next;
}`,
  },
  {
    id: "java75-reorder-list",
    title: "Reorder List",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "linked-list",
    prompt: "Reorder a linked list by interleaving the first and second halves in reverse order.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "list reversal", "merge interleave"],
    code: String.raw`public void reorderList(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    ListNode prev = null, curr = slow;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    ListNode first = head, second = prev;
    while (second.next != null) {
        ListNode temp1 = first.next;
        ListNode temp2 = second.next;
        first.next = second;
        second.next = temp1;
        first = temp1;
        second = temp2;
    }
}`,
  },
  {
    id: "java75-remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "linked-list",
    prompt: "Remove the nth node from the end of a linked list in one pass.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["dummy node", "two pointer gap", "single pass"],
    code: String.raw`public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy, slow = dummy;
    for (int i = 0; i < n; i++) {
        fast = fast.next;
    }
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}`,
  },
  {
    id: "java75-linked-list-cycle",
    title: "Linked List Cycle",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "linked-list",
    prompt: "Detect whether a linked list contains a cycle.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "while loop", "boolean return"],
    code: String.raw`public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
  },
  {
    id: "java75-merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "Java",
    category: "heap",
    prompt: "Merge k sorted linked lists into a single sorted linked list.",
    shikiLang: "java",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["priority queue", "comparator lambda", "dummy node"],
    code: String.raw`public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode node : lists) {
        if (node != null) heap.offer(node);
    }

    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (!heap.isEmpty()) {
        ListNode smallest = heap.poll();
        tail.next = smallest;
        tail = tail.next;
        if (smallest.next != null) heap.offer(smallest.next);
    }
    return dummy.next;
}`,
  },
  {
    id: "java75-invert-binary-tree",
    title: "Invert Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "tree-recursion",
    prompt: "Flip a binary tree so every left and right child is swapped.",
    shikiLang: "java",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion", "node swap", "null base case"],
    code: String.raw`public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}`,
  },
  {
    id: "java75-maximum-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "tree-recursion",
    prompt: "Find the maximum depth of a binary tree.",
    shikiLang: "java",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion", "Math.max", "null base case"],
    code: String.raw`public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
  },
  {
    id: "java75-same-tree",
    title: "Same Tree",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "tree-recursion",
    prompt: "Check whether two binary trees are structurally identical with the same values.",
    shikiLang: "java",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursion", "null checks", "boolean and"],
    code: String.raw`public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null || p.val != q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
  },
  {
    id: "java75-subtree-of-another-tree",
    title: "Subtree of Another Tree",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "tree-recursion",
    prompt: "Check whether one binary tree is a subtree of another.",
    shikiLang: "java",
    optimality: "O(m * n) time, O(h) space",
    typingFocus: ["recursive helper", "tree comparison", "short circuit or"],
    code: String.raw`public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

private boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null || p.val != q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
  },
  {
    id: "java75-lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "bst",
    prompt: "Find the lowest common ancestor of two nodes in a binary search tree.",
    shikiLang: "java",
    optimality: "O(h) time, O(1) space",
    typingFocus: ["bst property", "while loop", "value comparisons"],
    code: String.raw`public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode curr = root;
    while (curr != null) {
        if (p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        } else if (p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        } else {
            return curr;
        }
    }
    return null;
}`,
  },
  {
    id: "java75-binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "bfs",
    prompt: "Return the values of a binary tree grouped by level using breadth-first traversal.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["ArrayDeque queue", "level size snapshot", "nested loop"],
    code: String.raw`public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
  },
  {
    id: "java75-validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "bst",
    prompt: "Check whether a binary tree satisfies the binary search tree property.",
    shikiLang: "java",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive bounds", "long boundaries", "helper method"],
    code: String.raw`public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean validate(TreeNode node, long lower, long upper) {
    if (node == null) return true;
    if (node.val <= lower || node.val >= upper) return false;
    return validate(node.left, lower, node.val) && validate(node.right, node.val, upper);
}`,
  },
  {
    id: "java75-binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    domain: "dsa",
    track: "Trees",
    language: "Java",
    category: "tree-recursion",
    prompt: "Find the maximum sum of values along any path between two nodes in a binary tree.",
    shikiLang: "java",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["instance field", "recursive helper", "Math.max clamp to zero"],
    code: String.raw`private int best = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    maxGain(root);
    return best;
}

private int maxGain(TreeNode node) {
    if (node == null) return 0;
    int leftGain = Math.max(maxGain(node.left), 0);
    int rightGain = Math.max(maxGain(node.right), 0);
    best = Math.max(best, node.val + leftGain + rightGain);
    return node.val + Math.max(leftGain, rightGain);
}`,
  },
  {
    id: "java75-implement-trie",
    title: "Implement Trie (Prefix Tree)",
    domain: "dsa",
    track: "Tries",
    language: "Java",
    category: "trie",
    prompt: "Implement a trie supporting insert, search, and startsWith operations.",
    shikiLang: "java",
    optimality: "O(k) time per operation for key length k",
    typingFocus: ["array of children", "boolean flag", "nested class"],
    code: String.raw`class Trie {
    private final Trie[] children = new Trie[26];
    private boolean isEnd = false;

    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) node.children[idx] = new Trie();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        Trie node = find(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private Trie find(String s) {
        Trie node = this;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}`,
  },
  {
    id: "java75-design-add-search-words",
    title: "Design Add and Search Words Data Structure",
    domain: "dsa",
    track: "Tries",
    language: "Java",
    category: "trie",
    prompt: "Design a trie-backed structure supporting word insertion and wildcard search with '.'.",
    shikiLang: "java",
    optimality: "O(k) average, O(26^k) worst case for wildcard search",
    typingFocus: ["recursive search", "wildcard branching", "trie node array"],
    code: String.raw`class WordDictionary {
    private final WordDictionary[] children = new WordDictionary[26];
    private boolean isEnd = false;

    public void addWord(String word) {
        WordDictionary node = this;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) node.children[idx] = new WordDictionary();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        return searchFrom(word, 0);
    }

    private boolean searchFrom(String word, int index) {
        if (index == word.length()) return isEnd;
        char c = word.charAt(index);
        if (c == '.') {
            for (WordDictionary child : children) {
                if (child != null && child.searchFrom(word, index + 1)) return true;
            }
            return false;
        }
        WordDictionary next = children[c - 'a'];
        return next != null && next.searchFrom(word, index + 1);
    }
}`,
  },
  {
    id: "java75-word-search-ii",
    title: "Word Search II",
    domain: "dsa",
    track: "Tries",
    language: "Java",
    category: "trie-backtracking",
    prompt: "Find all words from a dictionary that can be formed by tracing adjacent cells in a board.",
    shikiLang: "java",
    optimality: "O(rows * cols * 4^L) time for max word length L",
    typingFocus: ["trie build", "dfs backtracking", "visited marker via mutation"],
    code: String.raw`public List<String> findWords(char[][] board, String[] words) {
    TrieNode root = new TrieNode();
    for (String word : words) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node = node.children.computeIfAbsent(c, k -> new TrieNode());
        }
        node.word = word;
    }

    List<String> result = new ArrayList<>();
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            dfs(board, r, c, root, result);
        }
    }
    return result;
}

private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
    if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] == '#') return;
    char ch = board[r][c];
    TrieNode next = node.children.get(ch);
    if (next == null) return;

    if (next.word != null) {
        result.add(next.word);
        next.word = null;
    }

    board[r][c] = '#';
    dfs(board, r + 1, c, next, result);
    dfs(board, r - 1, c, next, result);
    dfs(board, r, c + 1, next, result);
    dfs(board, r, c - 1, next, result);
    board[r][c] = ch;
}

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    String word = null;
}`,
  },
  {
    id: "java75-k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Java",
    category: "heap",
    prompt: "Return the k points closest to the origin from a list of 2D points.",
    shikiLang: "java",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["priority queue comparator", "max-heap trick", "lambda"],
    code: String.raw`public int[][] kClosest(int[][] points, int k) {
    PriorityQueue<int[]> heap = new PriorityQueue<>(
        (a, b) -> (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])
    );
    for (int[] point : points) {
        heap.offer(point);
        if (heap.size() > k) heap.poll();
    }
    return heap.toArray(new int[0][]);
}`,
  },
  {
    id: "java75-task-scheduler",
    title: "Task Scheduler",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Java",
    category: "greedy-heap",
    prompt: "Find the minimum number of intervals to complete all tasks given a cooldown between same tasks.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space (fixed 26 letters)",
    typingFocus: ["frequency counting", "max heap", "queue of cooldowns"],
    code: String.raw`public int leastInterval(char[] tasks, int n) {
    int[] counts = new int[26];
    for (char t : tasks) counts[t - 'A']++;

    PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
    for (int c : counts) {
        if (c > 0) heap.offer(c);
    }

    int time = 0;
    Queue<int[]> cooldown = new LinkedList<>();
    while (!heap.isEmpty() || !cooldown.isEmpty()) {
        time++;
        if (!heap.isEmpty()) {
            int count = heap.poll() - 1;
            if (count > 0) cooldown.offer(new int[] { count, time + n });
        }
        if (!cooldown.isEmpty() && cooldown.peek()[1] == time) {
            heap.offer(cooldown.poll()[0]);
        }
    }
    return time;
}`,
  },
  {
    id: "java75-subsets",
    title: "Subsets",
    domain: "dsa",
    track: "Backtracking",
    language: "Java",
    category: "backtracking",
    prompt: "Generate all possible subsets of a set of distinct integers.",
    shikiLang: "java",
    optimality: "O(n * 2^n) time and space",
    typingFocus: ["backtracking", "ArrayList copy", "recursive helper"],
    code: String.raw`public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}`,
  },
  {
    id: "java75-combination-sum",
    title: "Combination Sum",
    domain: "dsa",
    track: "Backtracking",
    language: "Java",
    category: "backtracking",
    prompt: "Find all unique combinations of candidates that sum to a target, reusing numbers freely.",
    shikiLang: "java",
    optimality: "O(2^target) time worst case",
    typingFocus: ["backtracking", "recursion with reuse", "early pruning"],
    code: String.raw`public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] candidates, int remaining, int start, List<Integer> current, List<List<Integer>> result) {
    if (remaining == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    if (remaining < 0) return;

    for (int i = start; i < candidates.length; i++) {
        current.add(candidates[i]);
        backtrack(candidates, remaining - candidates[i], i, current, result);
        current.remove(current.size() - 1);
    }
}`,
  },
  {
    id: "java75-permutations",
    title: "Permutations",
    domain: "dsa",
    track: "Backtracking",
    language: "Java",
    category: "backtracking",
    prompt: "Generate all possible permutations of a list of distinct integers.",
    shikiLang: "java",
    optimality: "O(n * n!) time and space",
    typingFocus: ["boolean used array", "backtracking", "recursive helper"],
    code: String.raw`public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
    return result;
}

private void backtrack(int[] nums, List<Integer> current, boolean[] used, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, current, used, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`,
  },
  {
    id: "java75-word-search",
    title: "Word Search",
    domain: "dsa",
    track: "Backtracking",
    language: "Java",
    category: "backtracking",
    prompt: "Determine if a word can be constructed from adjacent letters in a grid.",
    shikiLang: "java",
    optimality: "O(rows * cols * 4^L) time for word length L",
    typingFocus: ["dfs backtracking", "in-place visited marker", "bounds checking"],
    code: String.raw`public boolean exist(char[][] board, String word) {
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            if (dfs(board, word, r, c, 0)) return true;
        }
    }
    return false;
}

private boolean dfs(char[][] board, String word, int r, int c, int idx) {
    if (idx == word.length()) return true;
    if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != word.charAt(idx)) {
        return false;
    }

    char temp = board[r][c];
    board[r][c] = '#';
    boolean found = dfs(board, word, r + 1, c, idx + 1)
        || dfs(board, word, r - 1, c, idx + 1)
        || dfs(board, word, r, c + 1, idx + 1)
        || dfs(board, word, r, c - 1, idx + 1);
    board[r][c] = temp;
    return found;
}`,
  },
  {
    id: "java75-letter-combinations-phone-number",
    title: "Letter Combinations of a Phone Number",
    domain: "dsa",
    track: "Backtracking",
    language: "Java",
    category: "backtracking",
    prompt: "Return all letter combinations a phone number could represent based on keypad mapping.",
    shikiLang: "java",
    optimality: "O(4^n) time worst case",
    typingFocus: ["array of strings mapping", "backtracking", "StringBuilder"],
    code: String.raw`private static final String[] MAPPING = {
    "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
};

public List<String> letterCombinations(String digits) {
    List<String> result = new ArrayList<>();
    if (digits.isEmpty()) return result;
    backtrack(digits, 0, new StringBuilder(), result);
    return result;
}

private void backtrack(String digits, int index, StringBuilder current, List<String> result) {
    if (index == digits.length()) {
        result.add(current.toString());
        return;
    }
    String letters = MAPPING[digits.charAt(index) - '0'];
    for (char c : letters.toCharArray()) {
        current.append(c);
        backtrack(digits, index + 1, current, result);
        current.deleteCharAt(current.length() - 1);
    }
}`,
  },
  {
    id: "java75-number-of-islands",
    title: "Number of Islands",
    domain: "dsa",
    track: "Graphs",
    language: "Java",
    category: "graph-dfs",
    prompt: "Count the number of islands of connected land cells in a grid.",
    shikiLang: "java",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["dfs flood fill", "grid bounds check", "in-place marking"],
    code: String.raw`public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                sink(grid, r, c);
            }
        }
    }
    return count;
}

private void sink(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0';
    sink(grid, r + 1, c);
    sink(grid, r - 1, c);
    sink(grid, r, c + 1);
    sink(grid, r, c - 1);
}`,
  },
  {
    id: "java75-clone-graph",
    title: "Clone Graph",
    domain: "dsa",
    track: "Graphs",
    language: "Java",
    category: "graph-dfs",
    prompt: "Create a deep copy of a connected undirected graph given a reference node.",
    shikiLang: "java",
    optimality: "O(n) time and space",
    typingFocus: ["hashmap of clones", "recursive dfs", "neighbor list building"],
    code: String.raw`public Node cloneGraph(Node node) {
    if (node == null) return null;
    return clone(node, new HashMap<>());
}

private Node clone(Node node, Map<Node, Node> visited) {
    if (visited.containsKey(node)) return visited.get(node);

    Node copy = new Node(node.val);
    visited.put(node, copy);
    for (Node neighbor : node.neighbors) {
        copy.neighbors.add(clone(neighbor, visited));
    }
    return copy;
}`,
  },
  {
    id: "java75-pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    domain: "dsa",
    track: "Graphs",
    language: "Java",
    category: "graph-dfs",
    prompt: "Find grid cells from which water can flow to both the Pacific and Atlantic oceans.",
    shikiLang: "java",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["multi-source dfs", "boolean grids", "reverse flow logic"],
    code: String.raw`public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length, cols = heights[0].length;
    boolean[][] pacific = new boolean[rows][cols];
    boolean[][] atlantic = new boolean[rows][cols];

    for (int c = 0; c < cols; c++) {
        dfs(heights, 0, c, pacific);
        dfs(heights, rows - 1, c, atlantic);
    }
    for (int r = 0; r < rows; r++) {
        dfs(heights, r, 0, pacific);
        dfs(heights, r, cols - 1, atlantic);
    }

    List<List<Integer>> result = new ArrayList<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.add(Arrays.asList(r, c));
            }
        }
    }
    return result;
}

private void dfs(int[][] heights, int r, int c, boolean[][] visited) {
    visited[r][c] = true;
    int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr < 0 || nc < 0 || nr >= heights.length || nc >= heights[0].length) continue;
        if (visited[nr][nc] || heights[nr][nc] < heights[r][c]) continue;
        dfs(heights, nr, nc, visited);
    }
}`,
  },
  {
    id: "java75-course-schedule",
    title: "Course Schedule",
    domain: "dsa",
    track: "Graphs",
    language: "Java",
    category: "topological-sort",
    prompt: "Determine whether it is possible to finish all courses given their prerequisites.",
    shikiLang: "java",
    optimality: "O(V + E) time and space",
    typingFocus: ["adjacency list", "cycle detection", "recursion state array"],
    code: String.raw`public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] pre : prerequisites) graph.get(pre[0]).add(pre[1]);

    int[] state = new int[numCourses];
    for (int i = 0; i < numCourses; i++) {
        if (hasCycle(graph, i, state)) return false;
    }
    return true;
}

private boolean hasCycle(List<List<Integer>> graph, int node, int[] state) {
    if (state[node] == 1) return true;
    if (state[node] == 2) return false;

    state[node] = 1;
    for (int next : graph.get(node)) {
        if (hasCycle(graph, next, state)) return true;
    }
    state[node] = 2;
    return false;
}`,
  },
  {
    id: "java75-climbing-stairs",
    title: "Climbing Stairs",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Count how many distinct ways there are to climb n stairs taking one or two steps.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["variable rotation", "for loop", "tuple-style update"],
    code: String.raw`public int climbStairs(int n) {
    int oneStepBack = 1, twoStepsBack = 1;
    for (int i = 2; i <= n; i++) {
        int current = oneStepBack + twoStepsBack;
        twoStepsBack = oneStepBack;
        oneStepBack = current;
    }
    return oneStepBack;
}`,
  },
  {
    id: "java75-house-robber",
    title: "House Robber",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Find the maximum money that can be robbed from houses without robbing two adjacent ones.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "Math.max", "for loop"],
    code: String.raw`public int rob(int[] nums) {
    int prev = 0, curr = 0;
    for (int num : nums) {
        int temp = Math.max(curr, prev + num);
        prev = curr;
        curr = temp;
    }
    return curr;
}`,
  },
  {
    id: "java75-house-robber-ii",
    title: "House Robber II",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Solve house robber where houses are arranged in a circle, so first and last are adjacent.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["helper function", "Arrays.copyOfRange", "circular edge case"],
    code: String.raw`public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(
        robLine(Arrays.copyOfRange(nums, 0, nums.length - 1)),
        robLine(Arrays.copyOfRange(nums, 1, nums.length))
    );
}

private int robLine(int[] nums) {
    int prev = 0, curr = 0;
    for (int num : nums) {
        int temp = Math.max(curr, prev + num);
        prev = curr;
        curr = temp;
    }
    return curr;
}`,
  },
  {
    id: "java75-longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Find the longest palindromic substring within a string.",
    shikiLang: "java",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand around center", "helper function", "substring extraction"],
    code: String.raw`public String longestPalindrome(String s) {
    int start = 0, maxLen = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expand(s, i, i);
        int len2 = expand(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > maxLen) {
            maxLen = len;
            start = i - (len - 1) / 2;
        }
    }
    return s.substring(start, start + maxLen);
}

private int expand(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`,
  },
  {
    id: "java75-decode-ways",
    title: "Decode Ways",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Count the number of ways to decode a digit string into letters A-Z.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling dp", "substring parsing", "conditional accumulation"],
    code: String.raw`public int numDecodings(String s) {
    if (s.isEmpty() || s.charAt(0) == '0') return 0;
    int prev2 = 1, prev1 = 1;
    for (int i = 1; i < s.length(); i++) {
        int current = 0;
        if (s.charAt(i) != '0') current += prev1;
        int twoDigit = Integer.parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) current += prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
  },
  {
    id: "java75-coin-change",
    title: "Coin Change",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Find the fewest number of coins needed to make up a given amount.",
    shikiLang: "java",
    optimality: "O(amount * coins) time, O(amount) space",
    typingFocus: ["bottom-up dp array", "Arrays.fill", "Math.min"],
    code: String.raw`public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
  },
  {
    id: "java75-word-break",
    title: "Word Break",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Determine if a string can be segmented into space-separated words from a dictionary.",
    shikiLang: "java",
    optimality: "O(n^2) time, O(n) space",
    typingFocus: ["boolean dp array", "hashset lookup", "substring checks"],
    code: String.raw`public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> words = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && words.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}`,
  },
  {
    id: "java75-longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Java",
    category: "dp",
    prompt: "Find the length of the longest strictly increasing subsequence in an array.",
    shikiLang: "java",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["binary search insertion", "patience sorting", "Arrays.binarySearch"],
    code: String.raw`public int lengthOfLIS(int[] nums) {
    int[] tails = new int[nums.length];
    int size = 0;
    for (int num : nums) {
        int left = 0, right = size;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        tails[left] = num;
        if (left == size) size++;
    }
    return size;
}`,
  },
  {
    id: "java75-unique-paths",
    title: "Unique Paths",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Java",
    category: "dp-2d",
    prompt: "Count the number of unique paths from top-left to bottom-right of a grid moving only right or down.",
    shikiLang: "java",
    optimality: "O(rows * cols) time, O(cols) space",
    typingFocus: ["1d rolling dp array", "nested for loops", "in-place accumulation"],
    code: String.raw`public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            dp[c] += dp[c - 1];
        }
    }
    return dp[n - 1];
}`,
  },
  {
    id: "java75-longest-common-subsequence",
    title: "Longest Common Subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Java",
    category: "dp-2d",
    prompt: "Find the length of the longest subsequence common to two strings.",
    shikiLang: "java",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["2d dp table", "char comparison", "nested for loops"],
    code: String.raw`public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,
  },
  {
    id: "java75-maximum-subarray",
    title: "Maximum Subarray",
    domain: "dsa",
    track: "Greedy",
    language: "Java",
    category: "greedy",
    prompt: "Find the contiguous subarray with the largest sum.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["kadane's algorithm", "running sum reset", "Math.max"],
    code: String.raw`public int maxSubArray(int[] nums) {
    int best = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        best = Math.max(best, currentSum);
    }
    return best;
}`,
  },
  {
    id: "java75-jump-game",
    title: "Jump Game",
    domain: "dsa",
    track: "Greedy",
    language: "Java",
    category: "greedy",
    prompt: "Determine if you can reach the last index given max jump lengths at each position.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy reachable tracking", "for loop", "early exit"],
    code: String.raw`public boolean canJump(int[] nums) {
    int reachable = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > reachable) return false;
        reachable = Math.max(reachable, i + nums[i]);
    }
    return true;
}`,
  },
  {
    id: "java75-insert-interval",
    title: "Insert Interval",
    domain: "dsa",
    track: "Intervals",
    language: "Java",
    category: "intervals",
    prompt: "Insert a new interval into a sorted, non-overlapping list of intervals and merge as needed.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["list building", "interval merging", "Math.min/Math.max"],
    code: String.raw`public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);

    while (i < n) {
        result.add(intervals[i]);
        i++;
    }

    return result.toArray(new int[0][]);
}`,
  },
  {
    id: "java75-merge-intervals",
    title: "Merge Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "Java",
    category: "intervals",
    prompt: "Merge all overlapping intervals in a list of intervals.",
    shikiLang: "java",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["comparator sort", "list building", "interval overlap check"],
    code: String.raw`public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();

    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
        }
    }

    return merged.toArray(new int[0][]);
}`,
  },
  {
    id: "java75-rotate-image",
    title: "Rotate Image",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Java",
    category: "matrix",
    prompt: "Rotate an n x n matrix 90 degrees clockwise in place.",
    shikiLang: "java",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["transpose then reverse", "nested loops", "in-place swap"],
    code: String.raw`public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int r = 0; r < n; r++) {
        for (int c = r + 1; c < n; c++) {
            int temp = matrix[r][c];
            matrix[r][c] = matrix[c][r];
            matrix[c][r] = temp;
        }
    }
    for (int r = 0; r < n; r++) {
        for (int left = 0, right = n - 1; left < right; left++, right--) {
            int temp = matrix[r][left];
            matrix[r][left] = matrix[r][right];
            matrix[r][right] = temp;
        }
    }
}`,
  },
  {
    id: "java75-spiral-matrix",
    title: "Spiral Matrix",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Java",
    category: "matrix",
    prompt: "Return all elements of a matrix in spiral order.",
    shikiLang: "java",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["boundary shrinking", "four direction loops", "list building"],
    code: String.raw`public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) result.add(matrix[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) result.add(matrix[r][right]);
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) result.add(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) result.add(matrix[r][left]);
            left++;
        }
    }
    return result;
}`,
  },
  {
    id: "java75-set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Java",
    category: "matrix",
    prompt: "Set entire rows and columns to zero if any cell in them is zero, in place.",
    shikiLang: "java",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["first row/col as markers", "boolean flags", "nested loops"],
    code: String.raw`public void setZeroes(int[][] matrix) {
    int rows = matrix.length, cols = matrix[0].length;
    boolean firstRowZero = false, firstColZero = false;

    for (int c = 0; c < cols; c++) if (matrix[0][c] == 0) firstRowZero = true;
    for (int r = 0; r < rows; r++) if (matrix[r][0] == 0) firstColZero = true;

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

    if (firstRowZero) Arrays.fill(matrix[0], 0);
    if (firstColZero) for (int r = 0; r < rows; r++) matrix[r][0] = 0;
}`,
  },
  {
    id: "java75-single-number",
    title: "Single Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Java",
    category: "bit-manipulation",
    prompt: "Find the element that appears only once in an array where every other element appears twice.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor operator", "for loop", "accumulator"],
    code: String.raw`public int singleNumber(int[] nums) {
    int result = 0;
    for (int n : nums) {
        result ^= n;
    }
    return result;
}`,
  },
  {
    id: "java75-number-of-1-bits",
    title: "Number of 1 Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Java",
    category: "bit-manipulation",
    prompt: "Count the number of set bits in an unsigned integer.",
    shikiLang: "java",
    optimality: "O(1) time (32 bits), O(1) space",
    typingFocus: ["bitwise and", "unsigned right shift", "while loop"],
    code: String.raw`public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}`,
  },
  {
    id: "java75-counting-bits",
    title: "Counting Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Java",
    category: "bit-manipulation",
    prompt: "For every number from 0 to n, count the number of set bits using previously computed results.",
    shikiLang: "java",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dp array", "bit shift recurrence", "for loop"],
    code: String.raw`public int[] countBits(int n) {
    int[] result = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    return result;
}`,
  },
  {
    id: "java75-missing-number",
    title: "Missing Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Java",
    category: "bit-manipulation",
    prompt: "Find the missing number from an array containing n distinct numbers in range 0 to n.",
    shikiLang: "java",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor accumulation", "index vs value xor", "for loop"],
    code: String.raw`public int missingNumber(int[] nums) {
    int result = nums.length;
    for (int i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}`,
  },
];
