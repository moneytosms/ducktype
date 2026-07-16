import type { Snippet } from "@/types/snippet";

export const dsaPythonSnippets: Snippet[] = [
  // ---------- Arrays & Hashing ----------
  {
    id: "py75-two-sum",
    title: "Two Sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "hash map",
    prompt: "Find indices of two numbers in an array that add up to a target value.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dict lookups", "enumerate", "return tuple"],
    code: String.raw`def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []`,
  },
  {
    id: "py75-contains-duplicate",
    title: "Contains Duplicate",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "hash set",
    prompt: "Determine whether any value appears at least twice in an array.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["set construction", "len comparisons"],
    code: String.raw`def contains_duplicate(nums: list[int]) -> bool:
    return len(set(nums)) != len(nums)`,
  },
  {
    id: "py75-group-anagrams",
    title: "Group Anagrams",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "hash map",
    prompt: "Group a list of strings so that anagrams of each other end up in the same list.",
    shikiLang: "python",
    optimality: "O(n * k log k) time, O(n * k) space",
    typingFocus: ["defaultdict", "sorted() as key", "list comprehension"],
    code: String.raw`from collections import defaultdict


def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[str, list[str]] = defaultdict(list)

    for word in strs:
        key = "".join(sorted(word))
        groups[key].append(word)

    return list(groups.values())`,
  },
  {
    id: "py75-top-k-frequent",
    title: "Top K Frequent Elements",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "bucket sort",
    prompt: "Return the k most frequent elements in an integer array.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["Counter", "bucket sort", "reversed range slicing"],
    code: String.raw`from collections import Counter


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    counts = Counter(nums)
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]

    for num, freq in counts.items():
        buckets[freq].append(num)

    result: list[int] = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result

    return result`,
  },
  {
    id: "py75-product-except-self",
    title: "Product of Array Except Self",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "prefix product",
    prompt: "Return an array where each element is the product of all other elements, without using division.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) extra space",
    typingFocus: ["prefix/suffix passes", "reversed()", "in-place accumulation"],
    code: String.raw`def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [1] * n

    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in reversed(range(n)):
        result[i] *= suffix
        suffix *= nums[i]

    return result`,
  },
  {
    id: "py75-longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "hash set",
    prompt: "Find the length of the longest run of consecutive integers in an unsorted array.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["set membership checks", "while loops", "streak tracking"],
    code: String.raw`def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    longest = 0

    for num in num_set:
        if num - 1 in num_set:
            continue

        length = 1
        while num + length in num_set:
            length += 1

        longest = max(longest, length)

    return longest`,
  },
  {
    id: "py75-encode-decode-strings",
    title: "Encode and Decode Strings",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Python",
    category: "string encoding",
    prompt: "Design an algorithm to encode a list of strings into one string and decode it back.",
    shikiLang: "python",
    optimality: "O(n) time and space",
    typingFocus: ["string formatting", "index arithmetic", "while loops"],
    code: String.raw`def encode(strs: list[str]) -> str:
    return "".join(f"{len(s)}#{s}" for s in strs)


def decode(s: str) -> list[str]:
    result: list[str] = []
    i = 0

    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        start = j + 1
        result.append(s[start:start + length])
        i = start + length

    return result`,
  },

  // ---------- Two Pointers ----------
  {
    id: "py75-valid-palindrome",
    title: "Valid Palindrome",
    domain: "dsa",
    track: "Two Pointers",
    language: "Python",
    category: "two pointers",
    prompt: "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["while loop conditions", "isalnum", "pointer increments"],
    code: String.raw`def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`,
  },
  {
    id: "py75-two-sum-sorted",
    title: "Two Sum II (Sorted Input)",
    domain: "dsa",
    track: "Two Pointers",
    language: "Python",
    category: "two pointers",
    prompt: "Find two numbers in a sorted array that add up to a target, returning 1-indexed positions.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer narrowing", "1-indexed return"],
    code: String.raw`def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []`,
  },
  {
    id: "py75-three-sum",
    title: "3Sum",
    domain: "dsa",
    track: "Two Pointers",
    language: "Python",
    category: "two pointers",
    prompt: "Find all unique triplets in an array that sum to zero.",
    shikiLang: "python",
    optimality: "O(n^2) time, O(1) extra space",
    typingFocus: ["nested loops", "skip-duplicate guards", "sorted() preprocessing"],
    code: String.raw`def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result: list[list[int]] = []

    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        if nums[i] > 0:
            break

        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

    return result`,
  },
  {
    id: "py75-container-with-most-water",
    title: "Container With Most Water",
    domain: "dsa",
    track: "Two Pointers",
    language: "Python",
    category: "two pointers",
    prompt: "Find two lines that together with the x-axis form a container holding the most water.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["max() tracking", "pointer narrowing"],
    code: String.raw`def max_area(heights: list[int]) -> int:
    left, right = 0, len(heights) - 1
    best = 0

    while left < right:
        width = right - left
        area = width * min(heights[left], heights[right])
        best = max(best, area)

        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1

    return best`,
  },
  {
    id: "py75-trapping-rain-water",
    title: "Trapping Rain Water",
    domain: "dsa",
    track: "Two Pointers",
    language: "Python",
    category: "two pointers",
    prompt: "Compute how much water can be trapped between bars given their heights.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer max tracking", "conditional accumulation"],
    code: String.raw`def trap(height: list[int]) -> int:
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0

    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]

    return water`,
  },

  // ---------- Sliding Window ----------
  {
    id: "py75-best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "sliding window",
    prompt: "Find the maximum profit from buying and selling a stock once given daily prices.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running min tracking", "max profit updates"],
    code: String.raw`def max_profit(prices: list[int]) -> int:
    min_price = float("inf")
    best_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        best_profit = max(best_profit, price - min_price)

    return best_profit`,
  },
  {
    id: "py75-longest-substring-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "sliding window",
    prompt: "Find the length of the longest substring without repeating characters.",
    shikiLang: "python",
    optimality: "O(n) time, O(min(n, alphabet)) space",
    typingFocus: ["sliding window with set", "while loop shrinking"],
    code: String.raw`def length_of_longest_substring(s: str) -> int:
    seen: set[str] = set()
    left = 0
    longest = 0

    for right, char in enumerate(s):
        while char in seen:
            seen.remove(s[left])
            left += 1

        seen.add(char)
        longest = max(longest, right - left + 1)

    return longest`,
  },
  {
    id: "py75-longest-repeating-char-replacement",
    title: "Longest Repeating Character Replacement",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "sliding window",
    prompt: "Find the longest substring achievable by replacing at most k characters with any letter, so all its characters are the same.",
    shikiLang: "python",
    optimality: "O(n) time, O(26) space",
    typingFocus: ["Counter updates", "window shrink condition"],
    code: String.raw`from collections import defaultdict


def character_replacement(s: str, k: int) -> int:
    counts: dict[str, int] = defaultdict(int)
    left = 0
    max_freq = 0
    longest = 0

    for right, char in enumerate(s):
        counts[char] += 1
        max_freq = max(max_freq, counts[char])

        window_len = right - left + 1
        if window_len - max_freq > k:
            counts[s[left]] -= 1
            left += 1

        longest = max(longest, right - left + 1)

    return longest`,
  },
  {
    id: "py75-permutation-in-string",
    title: "Permutation in String",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "sliding window",
    prompt: "Check whether any permutation of one string appears as a substring of another.",
    shikiLang: "python",
    optimality: "O(n) time, O(26) space",
    typingFocus: ["Counter comparisons", "fixed-size window sliding"],
    code: String.raw`from collections import Counter


def check_inclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False

    need = Counter(s1)
    window: Counter = Counter(s2[: len(s1)])

    if window == need:
        return True

    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left_char = s2[i - len(s1)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]

        if window == need:
            return True

    return False`,
  },
  {
    id: "py75-minimum-window-substring",
    title: "Minimum Window Substring",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "sliding window",
    prompt: "Find the smallest substring of one string that contains every character of another string.",
    shikiLang: "python",
    optimality: "O(n) time, O(k) space",
    typingFocus: ["Counter management", "have/need counters", "window slicing"],
    code: String.raw`from collections import Counter


def min_window(s: str, t: str) -> str:
    if not t or not s:
        return ""

    need = Counter(t)
    missing = len(t)
    left = 0
    best_len = float("inf")
    best_start = 0

    for right, char in enumerate(s, 1):
        if need[char] > 0:
            missing -= 1
        need[char] -= 1

        while missing == 0:
            if right - left < best_len:
                best_len = right - left
                best_start = left

            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1

    return "" if best_len == float("inf") else s[best_start:best_start + best_len]`,
  },
  {
    id: "py75-sliding-window-maximum",
    title: "Sliding Window Maximum",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",
    category: "monotonic deque",
    prompt: "Return the maximum value in every fixed-size sliding window of an array.",
    shikiLang: "python",
    optimality: "O(n) time, O(k) space",
    typingFocus: ["deque operations", "monotonic invariant maintenance"],
    code: String.raw`from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq: deque[int] = deque()
    result: list[int] = []

    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)

        if dq[0] <= i - k:
            dq.popleft()

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,
  },

  // ---------- Stack ----------
  {
    id: "py75-valid-parentheses",
    title: "Valid Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "stack",
    prompt: "Determine whether a string of brackets is properly matched and nested.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack push/pop", "dict lookups"],
    code: String.raw`def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack`,
  },
  {
    id: "py75-min-stack",
    title: "Min Stack",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "stack design",
    prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    shikiLang: "python",
    optimality: "O(1) time per operation, O(n) space",
    typingFocus: ["class with __init__", "auxiliary stack", "method definitions"],
    code: String.raw`class MinStack:
    def __init__(self) -> None:
        self.stack: list[int] = []
        self.min_stack: list[int] = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1]) if self.min_stack else val
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]`,
  },
  {
    id: "py75-evaluate-reverse-polish",
    title: "Evaluate Reverse Polish Notation",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "stack",
    prompt: "Evaluate an arithmetic expression given in reverse Polish (postfix) notation.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack operations", "dict of operators", "int truncation"],
    code: String.raw`def eval_rpn(tokens: list[str]) -> int:
    stack: list[int] = []
    operators = {
        "+": lambda a, b: a + b,
        "-": lambda a, b: a - b,
        "*": lambda a, b: a * b,
        "/": lambda a, b: int(a / b),
    }

    for token in tokens:
        if token in operators:
            b = stack.pop()
            a = stack.pop()
            stack.append(operators[token](a, b))
        else:
            stack.append(int(token))

    return stack[-1]`,
  },
  {
    id: "py75-generate-parentheses",
    title: "Generate Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "backtracking",
    prompt: "Generate all combinations of well-formed parentheses for a given number of pairs.",
    shikiLang: "python",
    optimality: "O(4^n / sqrt(n)) time",
    typingFocus: ["recursive backtracking", "string concatenation"],
    code: String.raw`def generate_parenthesis(n: int) -> list[str]:
    result: list[str] = []

    def backtrack(current: str, open_count: int, close_count: int) -> None:
        if len(current) == 2 * n:
            result.append(current)
            return

        if open_count < n:
            backtrack(current + "(", open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ")", open_count, close_count + 1)

    backtrack("", 0, 0)
    return result`,
  },
  {
    id: "py75-daily-temperatures",
    title: "Daily Temperatures",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "monotonic stack",
    prompt: "For each day, find how many days you'd have to wait for a warmer temperature.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack", "index tracking"],
    code: String.raw`def daily_temperatures(temperatures: list[int]) -> list[int]:
    result = [0] * len(temperatures)
    stack: list[int] = []

    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index
        stack.append(i)

    return result`,
  },
  {
    id: "py75-car-fleet",
    title: "Car Fleet",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "monotonic stack",
    prompt: "Count how many car fleets will arrive at the destination given positions and speeds.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["zip and sort", "stack of arrival times"],
    code: String.raw`def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    stack: list[float] = []

    for pos, spd in cars:
        time = (target - pos) / spd
        if not stack or time > stack[-1]:
            stack.append(time)

    return len(stack)`,
  },
  {
    id: "py75-largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    domain: "dsa",
    track: "Stack",
    language: "Python",
    category: "monotonic stack",
    prompt: "Find the area of the largest rectangle that fits within a histogram of bar heights.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack of index/height pairs", "area computation"],
    code: String.raw`def largest_rectangle_area(heights: list[int]) -> int:
    stack: list[tuple[int, int]] = []
    max_area = 0

    for i, height in enumerate(heights):
        start = i
        while stack and stack[-1][1] > height:
            index, prev_height = stack.pop()
            max_area = max(max_area, prev_height * (i - index))
            start = index
        stack.append((start, height))

    for index, height in stack:
        max_area = max(max_area, height * (len(heights) - index))

    return max_area`,
  },

  // ---------- Binary Search ----------
  {
    id: "py75-binary-search",
    title: "Binary Search",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search",
    prompt: "Search a sorted array for a target value and return its index, or -1 if absent.",
    shikiLang: "python",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["mid computation", "while loop narrowing"],
    code: String.raw`def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
  },
  {
    id: "py75-search-2d-matrix",
    title: "Search a 2D Matrix",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search",
    prompt: "Search a value in an m x n matrix where rows and columns are sorted, treating it as a flattened sorted array.",
    shikiLang: "python",
    optimality: "O(log(m*n)) time, O(1) space",
    typingFocus: ["divmod usage", "flattened index math"],
    code: String.raw`def search_matrix(matrix: list[list[int]], target: int) -> bool:
    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1

    while left <= right:
        mid = (left + right) // 2
        row, col = divmod(mid, cols)
        value = matrix[row][col]

        if value == target:
            return True
        elif value < target:
            left = mid + 1
        else:
            right = mid - 1

    return False`,
  },
  {
    id: "py75-koko-bananas",
    title: "Koko Eating Bananas",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search on answer",
    prompt: "Find the minimum eating speed so all banana piles can be eaten within a given number of hours.",
    shikiLang: "python",
    optimality: "O(n log m) time, O(1) space",
    typingFocus: ["binary search on answer space", "ceiling division"],
    code: String.raw`import math


def min_eating_speed(piles: list[int], h: int) -> int:
    left, right = 1, max(piles)

    while left < right:
        speed = (left + right) // 2
        hours = sum(math.ceil(pile / speed) for pile in piles)

        if hours <= h:
            right = speed
        else:
            left = speed + 1

    return left`,
  },
  {
    id: "py75-search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search",
    prompt: "Search for a target in a rotated sorted array in logarithmic time.",
    shikiLang: "python",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["conditional branching", "sorted-half detection"],
    code: String.raw`def search_rotated(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,
  },
  {
    id: "py75-find-minimum-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search",
    prompt: "Find the minimum element in a rotated sorted array without duplicates.",
    shikiLang: "python",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["binary search narrowing", "comparison with right pointer"],
    code: String.raw`def find_min(nums: list[int]) -> int:
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]`,
  },
  {
    id: "py75-median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    domain: "dsa",
    track: "Binary Search",
    language: "Python",
    category: "binary search",
    prompt: "Find the median of two sorted arrays in logarithmic time.",
    shikiLang: "python",
    optimality: "O(log(min(m, n))) time, O(1) space",
    typingFocus: ["partition binary search", "edge-case infinities"],
    code: String.raw`def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    left, right = 0, m

    while left <= right:
        i = (left + right) // 2
        j = (m + n + 1) // 2 - i

        left1 = nums1[i - 1] if i > 0 else float("-inf")
        right1 = nums1[i] if i < m else float("inf")
        left2 = nums2[j - 1] if j > 0 else float("-inf")
        right2 = nums2[j] if j < n else float("inf")

        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1, left2) + min(right1, right2)) / 2
            return max(left1, left2)
        elif left1 > right2:
            right = i - 1
        else:
            left = i + 1

    raise ValueError("input arrays are not sorted")`,
  },

  // ---------- Linked List ----------
  {
    id: "py75-reverse-linked-list",
    title: "Reverse Linked List",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Reverse a singly linked list in place.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["node pointer rewiring", "while loop with prev/curr"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head

    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node

    return prev`,
  },
  {
    id: "py75-merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Merge two sorted linked lists into a single sorted linked list.",
    shikiLang: "python",
    optimality: "O(n + m) time, O(1) space",
    typingFocus: ["dummy node pattern", "pointer traversal"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def merge_two_lists(list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
    dummy = ListNode()
    tail = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next

    tail.next = list1 or list2
    return dummy.next`,
  },
  {
    id: "py75-reorder-list",
    title: "Reorder List",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Reorder a linked list so nodes alternate from the front and back halves.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "in-place reversal", "list interleaving"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def reorder_list(head: ListNode | None) -> None:
    if not head:
        return

    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    second = slow.next
    slow.next = None
    prev = None
    while second:
        next_node = second.next
        second.next = prev
        prev = second
        second = next_node

    first, second = head, prev
    while second:
        first_next = first.next
        second_next = second.next
        first.next = second
        second.next = first_next
        first = first_next
        second = second_next`,
  },
  {
    id: "py75-remove-nth-from-end",
    title: "Remove Nth Node From End of List",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Remove the nth node from the end of a linked list in one pass.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["dummy node", "two-pointer gap"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def remove_nth_from_end(head: ListNode | None, n: int) -> ListNode | None:
    dummy = ListNode(0, head)
    fast = slow = dummy

    for _ in range(n):
        fast = fast.next

    while fast.next:
        fast = fast.next
        slow = slow.next

    slow.next = slow.next.next
    return dummy.next`,
  },
  {
    id: "py75-linked-list-cycle",
    title: "Linked List Cycle",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Determine whether a linked list contains a cycle.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["fast/slow pointer detection", "while loop with and condition"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def has_cycle(head: ListNode | None) -> bool:
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True

    return False`,
  },
  {
    id: "py75-merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "heap",
    prompt: "Merge k sorted linked lists into a single sorted linked list.",
    shikiLang: "python",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["heap push/pop", "tuple comparisons", "dummy node merging"],
    code: String.raw`import heapq


class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def merge_k_lists(lists: list[ListNode | None]) -> ListNode | None:
    heap: list[tuple[int, int, ListNode]] = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    tail = dummy

    while heap:
        _, i, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,
  },
  {
    id: "py75-add-two-numbers",
    title: "Add Two Numbers",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "linked list",
    prompt: "Add two numbers represented as reversed linked lists of digits and return the sum as a linked list.",
    shikiLang: "python",
    optimality: "O(max(n, m)) time, O(max(n, m)) space",
    typingFocus: ["carry arithmetic", "divmod", "dummy node building"],
    code: String.raw`class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None) -> None:
        self.val = val
        self.next = next


def add_two_numbers(l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
    dummy = ListNode()
    tail = dummy
    carry = 0

    while l1 or l2 or carry:
        total = carry
        if l1:
            total += l1.val
            l1 = l1.next
        if l2:
            total += l2.val
            l2 = l2.next

        carry, digit = divmod(total, 10)
        tail.next = ListNode(digit)
        tail = tail.next

    return dummy.next`,
  },
  {
    id: "py75-copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    domain: "dsa",
    track: "Linked List",
    language: "Python",
    category: "hash map",
    prompt: "Deep copy a linked list where each node also has a pointer to a random node in the list.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dict-based node mapping", "two-pass traversal"],
    code: String.raw`class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None) -> None:
        self.val = x
        self.next = next
        self.random = random


def copy_random_list(head: "Node | None") -> "Node | None":
    if not head:
        return None

    mapping: dict[Node, Node] = {}

    node = head
    while node:
        mapping[node] = Node(node.val)
        node = node.next

    node = head
    while node:
        mapping[node].next = mapping.get(node.next)
        mapping[node].random = mapping.get(node.random)
        node = node.next

    return mapping[head]`,
  },

  // ---------- Trees ----------
  {
    id: "py75-invert-binary-tree",
    title: "Invert Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Invert a binary tree by swapping every left and right child.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive tree traversal", "tuple swap"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def invert_tree(root: TreeNode | None) -> TreeNode | None:
    if not root:
        return None

    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
  },
  {
    id: "py75-max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Find the maximum depth of a binary tree.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive base case", "max() of subtree results"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def max_depth(root: TreeNode | None) -> int:
    if not root:
        return 0

    return 1 + max(max_depth(root.left), max_depth(root.right))`,
  },
  {
    id: "py75-same-tree",
    title: "Same Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Determine whether two binary trees are structurally identical with the same values.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive equality checks", "boolean short-circuiting"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def is_same_tree(p: TreeNode | None, q: TreeNode | None) -> bool:
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False

    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
  },
  {
    id: "py75-subtree-of-another-tree",
    title: "Subtree of Another Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Determine whether one binary tree is a subtree of another.",
    shikiLang: "python",
    optimality: "O(n * m) time, O(n + m) space",
    typingFocus: ["nested recursive helpers", "reuse of same-tree logic"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def is_same_tree(p: TreeNode | None, q: TreeNode | None) -> bool:
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)


def is_subtree(root: TreeNode | None, sub_root: TreeNode | None) -> bool:
    if not root:
        return sub_root is None

    if is_same_tree(root, sub_root):
        return True

    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)`,
  },
  {
    id: "py75-lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "bst",
    prompt: "Find the lowest common ancestor of two nodes in a binary search tree.",
    shikiLang: "python",
    optimality: "O(h) time, O(1) space",
    typingFocus: ["bst comparisons", "iterative descent"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    node = root

    while node:
        if p.val < node.val and q.val < node.val:
            node = node.left
        elif p.val > node.val and q.val > node.val:
            node = node.right
        else:
            return node

    raise ValueError("nodes not found in tree")`,
  },
  {
    id: "py75-binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "bfs",
    prompt: "Return the values of a binary tree grouped level by level.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["deque bfs", "level-size batching"],
    code: String.raw`from collections import deque


class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []

    result: list[list[int]] = []
    queue: deque[TreeNode] = deque([root])

    while queue:
        level: list[int] = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result`,
  },
  {
    id: "py75-binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "bfs",
    prompt: "Return the values visible when looking at a binary tree from the right side.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["bfs level tracking", "last-element selection"],
    code: String.raw`from collections import deque


class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def right_side_view(root: TreeNode | None) -> list[int]:
    if not root:
        return []

    result: list[int] = []
    queue: deque[TreeNode] = deque([root])

    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:
                result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result`,
  },
  {
    id: "py75-count-good-nodes",
    title: "Count Good Nodes in Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Count nodes in a binary tree where no ancestor has a greater value than the node itself.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive max-so-far propagation"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def good_nodes(root: TreeNode) -> int:
    def dfs(node: TreeNode | None, max_so_far: int) -> int:
        if not node:
            return 0

        count = 1 if node.val >= max_so_far else 0
        max_so_far = max(max_so_far, node.val)

        return count + dfs(node.left, max_so_far) + dfs(node.right, max_so_far)

    return dfs(root, root.val)`,
  },
  {
    id: "py75-validate-bst",
    title: "Validate Binary Search Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "bst",
    prompt: "Determine whether a binary tree satisfies the binary search tree property.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive bounds passing", "float infinity sentinels"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node: TreeNode | None, low: float, high: float) -> bool:
        if not node:
            return True

        if not (low < node.val < high):
            return False

        return validate(node.left, low, node.val) and validate(node.right, node.val, high)

    return validate(root, float("-inf"), float("inf"))`,
  },
  {
    id: "py75-kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "bst",
    prompt: "Find the kth smallest value in a binary search tree.",
    shikiLang: "python",
    optimality: "O(h + k) time, O(h) space",
    typingFocus: ["iterative in-order traversal", "explicit stack"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def kth_smallest(root: TreeNode | None, k: int) -> int:
    stack: list[TreeNode] = []
    node = root

    while stack or node:
        while node:
            stack.append(node)
            node = node.left

        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val

        node = node.right

    raise ValueError("k is out of range")`,
  },
  {
    id: "py75-construct-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree construction",
    prompt: "Rebuild a binary tree given its preorder and inorder traversal sequences.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["index lookup dict", "recursive slicing"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode | None:
    inorder_index = {val: i for i, val in enumerate(inorder)}
    self_pre_index = [0]

    def build(left: int, right: int) -> TreeNode | None:
        if left > right:
            return None

        root_val = preorder[self_pre_index[0]]
        self_pre_index[0] += 1
        root = TreeNode(root_val)

        mid = inorder_index[root_val]
        root.left = build(left, mid - 1)
        root.right = build(mid + 1, right)
        return root

    return build(0, len(inorder) - 1)`,
  },
  {
    id: "py75-binary-tree-max-path-sum",
    title: "Binary Tree Maximum Path Sum",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree recursion",
    prompt: "Find the maximum path sum between any two nodes in a binary tree.",
    shikiLang: "python",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["nonlocal state", "recursive max gain"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def max_path_sum(root: TreeNode | None) -> int:
    best = float("-inf")

    def dfs(node: TreeNode | None) -> int:
        nonlocal best
        if not node:
            return 0

        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        best = max(best, node.val + left_gain + right_gain)
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return int(best)`,
  },
  {
    id: "py75-serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Python",
    category: "tree encoding",
    prompt: "Design an algorithm to serialize a binary tree to a string and deserialize it back.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["preorder recursion", "iterator-based decoding"],
    code: String.raw`class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def serialize(root: TreeNode | None) -> str:
    values: list[str] = []

    def dfs(node: TreeNode | None) -> None:
        if not node:
            values.append("#")
            return
        values.append(str(node.val))
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return ",".join(values)


def deserialize(data: str) -> TreeNode | None:
    values = iter(data.split(","))

    def build() -> TreeNode | None:
        val = next(values)
        if val == "#":
            return None
        node = TreeNode(int(val))
        node.left = build()
        node.right = build()
        return node

    return build()`,
  },

  // ---------- Tries ----------
  {
    id: "py75-implement-trie",
    title: "Implement Trie (Prefix Tree)",
    domain: "dsa",
    track: "Tries",
    language: "Python",
    category: "trie",
    prompt: "Implement a trie supporting insert, search, and prefix search operations.",
    shikiLang: "python",
    optimality: "O(k) time per operation, O(n * k) space",
    typingFocus: ["nested dict nodes", "class methods", "boolean flags"],
    code: String.raw`class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, "TrieNode"] = {}
        self.is_end = False


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, prefix: str) -> TrieNode | None:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node`,
  },
  {
    id: "py75-add-search-word",
    title: "Design Add and Search Words Data Structure",
    domain: "dsa",
    track: "Tries",
    language: "Python",
    category: "trie",
    prompt: "Design a data structure supporting word insertion and wildcard search with '.' matching any character.",
    shikiLang: "python",
    optimality: "O(k) average insert, O(26^k) worst-case search",
    typingFocus: ["trie with recursive wildcard search", "dfs backtracking"],
    code: String.raw`class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, "TrieNode"] = {}
        self.is_end = False


class WordDictionary:
    def __init__(self) -> None:
        self.root = TrieNode()

    def add_word(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_end = True

    def search(self, word: str) -> bool:
        def dfs(node: TrieNode, i: int) -> bool:
            if i == len(word):
                return node.is_end

            char = word[i]
            if char == ".":
                return any(dfs(child, i + 1) for child in node.children.values())

            if char not in node.children:
                return False

            return dfs(node.children[char], i + 1)

        return dfs(self.root, 0)`,
  },
  {
    id: "py75-word-search-2",
    title: "Word Search II",
    domain: "dsa",
    track: "Tries",
    language: "Python",
    category: "trie + backtracking",
    prompt: "Find all words from a dictionary that can be formed by tracing adjacent cells in a letter board.",
    shikiLang: "python",
    optimality: "O(rows * cols * 4^L) time, O(sum of word lengths) space",
    typingFocus: ["trie construction", "grid dfs with pruning", "visited-set toggling"],
    code: String.raw`class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None


def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.word = word

    rows, cols = len(board), len(board[0])
    result: set[str] = set()

    def dfs(r: int, c: int, node: TrieNode) -> None:
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] not in node.children:
            return

        char = board[r][c]
        next_node = node.children[char]
        if next_node.word:
            result.add(next_node.word)

        board[r][c] = "#"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(r + dr, c + dc, next_node)
        board[r][c] = char

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)

    return list(result)`,
  },

  // ---------- Heap / Priority Queue ----------
  {
    id: "py75-kth-largest-element-stream",
    title: "Kth Largest Element in a Stream",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Python",
    category: "heap",
    prompt: "Design a class that tracks the kth largest element in a growing stream of numbers.",
    shikiLang: "python",
    optimality: "O(log k) time per add, O(k) space",
    typingFocus: ["heapq push/pop", "fixed-size min-heap"],
    code: String.raw`import heapq


class KthLargest:
    def __init__(self, k: int, nums: list[int]) -> None:
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
  },
  {
    id: "py75-last-stone-weight",
    title: "Last Stone Weight",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Python",
    category: "heap",
    prompt: "Repeatedly smash the two heaviest stones together until at most one stone remains.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["max-heap via negation", "heapq push/pop"],
    code: String.raw`import heapq


def last_stone_weight(stones: list[int]) -> int:
    heap = [-stone for stone in stones]
    heapq.heapify(heap)

    while len(heap) > 1:
        first = -heapq.heappop(heap)
        second = -heapq.heappop(heap)
        if first != second:
            heapq.heappush(heap, -(first - second))

    return -heap[0] if heap else 0`,
  },
  {
    id: "py75-k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Python",
    category: "heap",
    prompt: "Find the k points closest to the origin from a list of 2D points.",
    shikiLang: "python",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["heapq.nsmallest", "lambda key functions"],
    code: String.raw`import heapq


def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    return heapq.nsmallest(k, points, key=lambda p: p[0] ** 2 + p[1] ** 2)`,
  },
  {
    id: "py75-task-scheduler",
    title: "Task Scheduler",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Python",
    category: "heap + greedy",
    prompt: "Find the minimum number of time units needed to complete tasks given a cooldown between identical tasks.",
    shikiLang: "python",
    optimality: "O(n log 26) time, O(26) space",
    typingFocus: ["Counter and heap combination", "deque for cooldown tracking"],
    code: String.raw`import heapq
from collections import Counter, deque


def least_interval(tasks: list[str], n: int) -> int:
    counts = Counter(tasks)
    heap = [-count for count in counts.values()]
    heapq.heapify(heap)

    time = 0
    cooldown: deque[tuple[int, int]] = deque()

    while heap or cooldown:
        time += 1
        if heap:
            count = heapq.heappop(heap) + 1
            if count < 0:
                cooldown.append((count, time + n))

        if cooldown and cooldown[0][1] == time:
            heapq.heappush(heap, cooldown.popleft()[0])

    return time`,
  },
  {
    id: "py75-find-median-from-data-stream",
    title: "Find Median from Data Stream",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Python",
    category: "two heaps",
    prompt: "Design a data structure that supports adding numbers and finding the median efficiently.",
    shikiLang: "python",
    optimality: "O(log n) time per add, O(1) time for median",
    typingFocus: ["two-heap balancing", "negated max-heap"],
    code: String.raw`import heapq


class MedianFinder:
    def __init__(self) -> None:
        self.small: list[int] = []  # max-heap (negated)
        self.large: list[int] = []  # min-heap

    def add_num(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2`,
  },

  // ---------- Backtracking ----------
  {
    id: "py75-subsets",
    title: "Subsets",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Return all possible subsets of a set of distinct integers.",
    shikiLang: "python",
    optimality: "O(2^n) time, O(n) recursion depth",
    typingFocus: ["backtracking template", "list append/pop"],
    code: String.raw`def subsets(nums: list[int]) -> list[list[int]]:
    result: list[list[int]] = []
    current: list[int] = []

    def backtrack(start: int) -> None:
        result.append(current.copy())

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1)
            current.pop()

    backtrack(0)
    return result`,
  },
  {
    id: "py75-combination-sum",
    title: "Combination Sum",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Find all unique combinations of numbers that sum to a target, reusing numbers unlimited times.",
    shikiLang: "python",
    optimality: "O(2^target) time worst case",
    typingFocus: ["backtracking with reuse", "early pruning on sum"],
    code: String.raw`def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result: list[list[int]] = []
    current: list[int] = []

    def backtrack(start: int, remaining: int) -> None:
        if remaining == 0:
            result.append(current.copy())
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.pop()

    backtrack(0, target)
    return result`,
  },
  {
    id: "py75-permutations",
    title: "Permutations",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Return all possible orderings of a list of distinct integers.",
    shikiLang: "python",
    optimality: "O(n!) time, O(n) recursion depth",
    typingFocus: ["swap-based permutation", "recursive index tracking"],
    code: String.raw`def permute(nums: list[int]) -> list[list[int]]:
    result: list[list[int]] = []

    def backtrack(start: int) -> None:
        if start == len(nums):
            result.append(nums.copy())
            return

        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return result`,
  },
  {
    id: "py75-subsets-2",
    title: "Subsets II",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Return all unique subsets of a list of integers that may contain duplicates.",
    shikiLang: "python",
    optimality: "O(2^n) time, O(n) recursion depth",
    typingFocus: ["sorted input for dedup", "skip-duplicate loop guard"],
    code: String.raw`def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result: list[list[int]] = []
    current: list[int] = []

    def backtrack(start: int) -> None:
        result.append(current.copy())

        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            current.append(nums[i])
            backtrack(i + 1)
            current.pop()

    backtrack(0)
    return result`,
  },
  {
    id: "py75-word-search",
    title: "Word Search",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Determine whether a word can be formed by tracing a path of adjacent cells in a grid.",
    shikiLang: "python",
    optimality: "O(rows * cols * 4^L) time, O(L) recursion depth",
    typingFocus: ["grid dfs backtracking", "temporary cell marking"],
    code: String.raw`def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int, i: int) -> bool:
        if i == len(word):
            return True
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]:
            return False

        temp = board[r][c]
        board[r][c] = "#"

        found = (
            dfs(r + 1, c, i + 1)
            or dfs(r - 1, c, i + 1)
            or dfs(r, c + 1, i + 1)
            or dfs(r, c - 1, i + 1)
        )

        board[r][c] = temp
        return found

    return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,
  },
  {
    id: "py75-palindrome-partitioning",
    title: "Palindrome Partitioning",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Partition a string so every substring is a palindrome, and return all such partitions.",
    shikiLang: "python",
    optimality: "O(n * 2^n) time worst case",
    typingFocus: ["palindrome check helper", "backtracking with slicing"],
    code: String.raw`def partition(s: str) -> list[list[str]]:
    result: list[list[str]] = []
    current: list[str] = []

    def is_palindrome(sub: str) -> bool:
        return sub == sub[::-1]

    def backtrack(start: int) -> None:
        if start == len(s):
            result.append(current.copy())
            return

        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]
            if is_palindrome(substring):
                current.append(substring)
                backtrack(end)
                current.pop()

    backtrack(0)
    return result`,
  },
  {
    id: "py75-letter-combinations-phone",
    title: "Letter Combinations of a Phone Number",
    domain: "dsa",
    track: "Backtracking",
    language: "Python",
    category: "backtracking",
    prompt: "Return all possible letter combinations that a phone number's digits could represent.",
    shikiLang: "python",
    optimality: "O(4^n) time worst case",
    typingFocus: ["dict of digit mappings", "recursive string building"],
    code: String.raw`def letter_combinations(digits: str) -> list[str]:
    if not digits:
        return []

    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    result: list[str] = []

    def backtrack(index: int, current: str) -> None:
        if index == len(digits):
            result.append(current)
            return

        for char in mapping[digits[index]]:
            backtrack(index + 1, current + char)

    backtrack(0, "")
    return result`,
  },

  // ---------- Graphs ----------
  {
    id: "py75-number-of-islands",
    title: "Number of Islands",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph dfs",
    prompt: "Count the number of islands of connected land cells in a grid.",
    shikiLang: "python",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["grid dfs flood fill", "visited marking via mutation"],
    code: String.raw`def num_islands(grid: list[list[str]]) -> int:
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r: int, c: int) -> None:
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
            return

        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)

    return count`,
  },
  {
    id: "py75-clone-graph",
    title: "Clone Graph",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph dfs",
    prompt: "Create a deep copy of a connected undirected graph given a reference node.",
    shikiLang: "python",
    optimality: "O(n + e) time, O(n) space",
    typingFocus: ["dict-based visited map", "recursive graph cloning"],
    code: String.raw`class Node:
    def __init__(self, val: int = 0, neighbors: list["Node"] | None = None) -> None:
        self.val = val
        self.neighbors = neighbors or []


def clone_graph(node: Node | None) -> Node | None:
    if not node:
        return None

    cloned: dict[Node, Node] = {}

    def dfs(current: Node) -> Node:
        if current in cloned:
            return cloned[current]

        copy = Node(current.val)
        cloned[current] = copy

        for neighbor in current.neighbors:
            copy.neighbors.append(dfs(neighbor))

        return copy

    return dfs(node)`,
  },
  {
    id: "py75-max-area-of-island",
    title: "Max Area of Island",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph dfs",
    prompt: "Find the area of the largest island of connected land cells in a grid.",
    shikiLang: "python",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["dfs area accumulation", "max tracking"],
    code: String.raw`def max_area_of_island(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> int:
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1:
            return 0

        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))

    return best`,
  },
  {
    id: "py75-pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph dfs",
    prompt: "Find grid cells from which water can flow to both the Pacific and Atlantic oceans.",
    shikiLang: "python",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["multi-source dfs", "set intersection"],
    code: String.raw`def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    rows, cols = len(heights), len(heights[0])
    pacific: set[tuple[int, int]] = set()
    atlantic: set[tuple[int, int]] = set()

    def dfs(r: int, c: int, visited: set[tuple[int, int]], prev_height: int) -> None:
        if (
            (r, c) in visited
            or r < 0
            or c < 0
            or r >= rows
            or c >= cols
            or heights[r][c] < prev_height
        ):
            return

        visited.add((r, c))
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(r + dr, c + dc, visited, heights[r][c])

    for c in range(cols):
        dfs(0, c, pacific, heights[0][c])
        dfs(rows - 1, c, atlantic, heights[rows - 1][c])

    for r in range(rows):
        dfs(r, 0, pacific, heights[r][0])
        dfs(r, cols - 1, atlantic, heights[r][cols - 1])

    return [list(cell) for cell in pacific & atlantic]`,
  },
  {
    id: "py75-surrounded-regions",
    title: "Surrounded Regions",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph dfs",
    prompt: "Capture all regions of 'O' cells not connected to the border by flipping them to 'X'.",
    shikiLang: "python",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["border-first dfs marking", "grid mutation pass"],
    code: String.raw`def solve(board: list[list[str]]) -> None:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != "O":
            return

        board[r][c] = "#"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)

    for r in range(rows):
        for c in range(cols):
            if board[r][c] == "O":
                board[r][c] = "X"
            elif board[r][c] == "#":
                board[r][c] = "O"`,
  },
  {
    id: "py75-rotting-oranges",
    title: "Rotting Oranges",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph bfs",
    prompt: "Find the minimum number of minutes until no fresh orange remains, as rot spreads to adjacent cells each minute.",
    shikiLang: "python",
    optimality: "O(rows * cols) time and space",
    typingFocus: ["multi-source bfs", "deque level processing"],
    code: String.raw`from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue: deque[tuple[int, int]] = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1

    return minutes if fresh == 0 else -1`,
  },
  {
    id: "py75-course-schedule",
    title: "Course Schedule",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "topological sort",
    prompt: "Determine whether it is possible to finish all courses given their prerequisite pairs.",
    shikiLang: "python",
    optimality: "O(n + e) time, O(n + e) space",
    typingFocus: ["adjacency list building", "cycle detection via dfs states"],
    code: String.raw`def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph: dict[int, list[int]] = {i: [] for i in range(num_courses)}
    for course, pre in prerequisites:
        graph[course].append(pre)

    state = [0] * num_courses  # 0 = unvisited, 1 = visiting, 2 = done

    def has_cycle(course: int) -> bool:
        if state[course] == 1:
            return True
        if state[course] == 2:
            return False

        state[course] = 1
        for pre in graph[course]:
            if has_cycle(pre):
                return True
        state[course] = 2
        return False

    return not any(has_cycle(course) for course in range(num_courses))`,
  },
  {
    id: "py75-course-schedule-2",
    title: "Course Schedule II",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "topological sort",
    prompt: "Return a valid course completion order given prerequisite pairs, or an empty list if impossible.",
    shikiLang: "python",
    optimality: "O(n + e) time, O(n + e) space",
    typingFocus: ["kahn's algorithm", "queue-based topological sort"],
    code: String.raw`from collections import deque


def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    graph: dict[int, list[int]] = {i: [] for i in range(num_courses)}
    in_degree = [0] * num_courses

    for course, pre in prerequisites:
        graph[pre].append(course)
        in_degree[course] += 1

    queue: deque[int] = deque(c for c in range(num_courses) if in_degree[c] == 0)
    order: list[int] = []

    while queue:
        course = queue.popleft()
        order.append(course)
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)

    return order if len(order) == num_courses else []`,
  },
  {
    id: "py75-graph-valid-tree",
    title: "Graph Valid Tree",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "union find",
    prompt: "Determine whether a given set of edges forms a valid tree over n nodes.",
    shikiLang: "python",
    optimality: "O(n * alpha(n)) time, O(n) space",
    typingFocus: ["union find with path compression", "edge count invariant"],
    code: String.raw`def valid_tree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1:
        return False

    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(x: int, y: int) -> bool:
        root_x, root_y = find(x), find(y)
        if root_x == root_y:
            return False
        parent[root_x] = root_y
        return True

    return all(union(a, b) for a, b in edges)`,
  },
  {
    id: "py75-number-of-connected-components",
    title: "Number of Connected Components in an Undirected Graph",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "union find",
    prompt: "Count the number of connected components in an undirected graph given a list of edges.",
    shikiLang: "python",
    optimality: "O(n * alpha(n)) time, O(n) space",
    typingFocus: ["union find helper functions", "set of roots counting"],
    code: String.raw`def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(x: int, y: int) -> None:
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_x] = root_y

    for a, b in edges:
        union(a, b)

    return len({find(i) for i in range(n)})`,
  },
  {
    id: "py75-word-ladder",
    title: "Word Ladder",
    domain: "dsa",
    track: "Graphs",
    language: "Python",
    category: "graph bfs",
    prompt: "Find the length of the shortest transformation sequence from one word to another, changing one letter at a time through valid dictionary words.",
    shikiLang: "python",
    optimality: "O(n * L^2) time, O(n * L) space",
    typingFocus: ["bfs level counting", "string char substitution", "set-based word bank"],
    code: String.raw`from collections import deque
from string import ascii_lowercase


def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    words = set(word_list)
    if end_word not in words:
        return 0

    queue: deque[tuple[str, int]] = deque([(begin_word, 1)])

    while queue:
        word, steps = queue.popleft()
        if word == end_word:
            return steps

        for i in range(len(word)):
            for char in ascii_lowercase:
                candidate = word[:i] + char + word[i + 1:]
                if candidate in words:
                    words.remove(candidate)
                    queue.append((candidate, steps + 1))

    return 0`,
  },

  // ---------- 1-D Dynamic Programming ----------
  {
    id: "py75-climbing-stairs",
    title: "Climbing Stairs",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Count how many distinct ways there are to climb a staircase taking one or two steps at a time.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["tuple assignment", "for loops", "returns"],
    code: String.raw`def climb_stairs(n: int) -> int:
    if n <= 2:
        return n

    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr

    return curr`,
  },
  {
    id: "py75-house-robber",
    title: "House Robber",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Find the maximum amount that can be robbed from houses in a row without robbing two adjacent houses.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "max() comparisons"],
    code: String.raw`def rob(nums: list[int]) -> int:
    prev, curr = 0, 0

    for num in nums:
        prev, curr = curr, max(curr, prev + num)

    return curr`,
  },
  {
    id: "py75-house-robber-2",
    title: "House Robber II",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Find the maximum amount that can be robbed from houses arranged in a circle without robbing two adjacent houses.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["helper function reuse", "slicing for circular exclusion"],
    code: String.raw`def rob(nums: list[int]) -> int:
    if len(nums) == 1:
        return nums[0]

    def rob_line(houses: list[int]) -> int:
        prev, curr = 0, 0
        for num in houses:
            prev, curr = curr, max(curr, prev + num)
        return curr

    return max(rob_line(nums[1:]), rob_line(nums[:-1]))`,
  },
  {
    id: "py75-longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp / expand around center",
    prompt: "Find the longest palindromic substring within a given string.",
    shikiLang: "python",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand-around-center helper", "even/odd case handling"],
    code: String.raw`def longest_palindrome(s: str) -> str:
    if not s:
        return ""

    start, end = 0, 0

    def expand(left: int, right: int) -> tuple[int, int]:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return left + 1, right - 1

    for i in range(len(s)):
        l1, r1 = expand(i, i)
        if r1 - l1 > end - start:
            start, end = l1, r1

        l2, r2 = expand(i, i + 1)
        if r2 - l2 > end - start:
            start, end = l2, r2

    return s[start:end + 1]`,
  },
  {
    id: "py75-palindromic-substrings",
    title: "Palindromic Substrings",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp / expand around center",
    prompt: "Count how many substrings of a string are palindromes.",
    shikiLang: "python",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand-around-center counting", "nested while loops"],
    code: String.raw`def count_substrings(s: str) -> int:
    count = 0

    def expand(left: int, right: int) -> None:
        nonlocal count
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)

    return count`,
  },
  {
    id: "py75-decode-ways",
    title: "Decode Ways",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Count the number of ways a digit string can be decoded into letters where 'A' is 1 through 'Z' is 26.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling dp variables", "int slicing conditions"],
    code: String.raw`def num_decodings(s: str) -> int:
    if not s or s[0] == "0":
        return 0

    prev2, prev1 = 1, 1

    for i in range(1, len(s)):
        current = 0
        if s[i] != "0":
            current += prev1
        if s[i - 1] == "1" or (s[i - 1] == "2" and s[i] <= "6"):
            current += prev2

        prev2, prev1 = prev1, current

    return prev1`,
  },
  {
    id: "py75-coin-change",
    title: "Coin Change",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Find the fewest number of coins needed to make up a given amount, or -1 if impossible.",
    shikiLang: "python",
    optimality: "O(amount * coins) time, O(amount) space",
    typingFocus: ["dp array initialization", "min() over inner loop"],
    code: String.raw`def coin_change(coins: list[int], amount: int) -> int:
    dp = [0] + [float("inf")] * amount

    for total in range(1, amount + 1):
        for coin in coins:
            if coin <= total:
                dp[total] = min(dp[total], dp[total - coin] + 1)

    return dp[amount] if dp[amount] != float("inf") else -1`,
  },
  {
    id: "py75-maximum-product-subarray",
    title: "Maximum Product Subarray",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Find the contiguous subarray within an array that has the largest product.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["min/max swap on negative", "rolling variables"],
    code: String.raw`def max_product(nums: list[int]) -> int:
    result = nums[0]
    curr_min, curr_max = 1, 1

    for num in nums:
        candidates = (num, num * curr_max, num * curr_min)
        curr_max = max(candidates)
        curr_min = min(candidates)
        result = max(result, curr_max)

    return result`,
  },
  {
    id: "py75-word-break",
    title: "Word Break",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp",
    prompt: "Determine whether a string can be segmented into a sequence of words from a dictionary.",
    shikiLang: "python",
    optimality: "O(n^2) time, O(n) space",
    typingFocus: ["boolean dp array", "substring slicing in loop"],
    code: String.raw`def word_break(s: str, word_dict: list[str]) -> bool:
    words = set(word_dict)
    dp = [False] * (len(s) + 1)
    dp[0] = True

    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break

    return dp[len(s)]`,
  },
  {
    id: "py75-longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp / binary search",
    prompt: "Find the length of the longest strictly increasing subsequence in an array.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["bisect module usage", "patience-sort style dp"],
    code: String.raw`from bisect import bisect_left


def length_of_lis(nums: list[int]) -> int:
    tails: list[int] = []

    for num in nums:
        index = bisect_left(tails, num)
        if index == len(tails):
            tails.append(num)
        else:
            tails[index] = num

    return len(tails)`,
  },
  {
    id: "py75-partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Python",
    category: "dp / subset sum",
    prompt: "Determine whether an array can be partitioned into two subsets with equal sum.",
    shikiLang: "python",
    optimality: "O(n * sum) time, O(sum) space",
    typingFocus: ["subset-sum bitset-style dp", "reversed range iteration"],
    code: String.raw`def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for total_so_far in range(target, num - 1, -1):
            dp[total_so_far] = dp[total_so_far] or dp[total_so_far - num]

    return dp[target]`,
  },

  // ---------- Dynamic Programming (2D / multi-dim) ----------
  {
    id: "py75-unique-paths",
    title: "Unique Paths",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Python",
    category: "2d dp",
    prompt: "Count the number of unique paths from the top-left to the bottom-right of a grid moving only right or down.",
    shikiLang: "python",
    optimality: "O(rows * cols) time, O(cols) space",
    typingFocus: ["1d rolling row dp", "list multiplication init"],
    code: String.raw`def unique_paths(m: int, n: int) -> int:
    row = [1] * n

    for _ in range(1, m):
        for col in range(1, n):
            row[col] += row[col - 1]

    return row[-1]`,
  },
  {
    id: "py75-longest-common-subsequence",
    title: "Longest Common Subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Python",
    category: "2d dp",
    prompt: "Find the length of the longest subsequence common to two strings.",
    shikiLang: "python",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["2d list comprehension init", "nested for loops"],
    code: String.raw`def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]`,
  },
  {
    id: "py75-maximum-subarray",
    title: "Maximum Subarray",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Python",
    category: "kadane's algorithm",
    prompt: "Find the contiguous subarray with the largest sum.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["kadane's running sum", "max() accumulation"],
    code: String.raw`def max_sub_array(nums: list[int]) -> int:
    best = nums[0]
    current = 0

    for num in nums:
        current = max(num, current + num)
        best = max(best, current)

    return best`,
  },
  {
    id: "py75-jump-game",
    title: "Jump Game",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Python",
    category: "greedy dp",
    prompt: "Determine whether you can reach the last index of an array given max-jump lengths at each position.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy reachability tracking", "reversed iteration"],
    code: String.raw`def can_jump(nums: list[int]) -> bool:
    goal = len(nums) - 1

    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i

    return goal == 0`,
  },

  // ---------- Greedy ----------
  {
    id: "py75-maximum-subarray-greedy-jump",
    title: "Jump Game II",
    domain: "dsa",
    track: "Greedy",
    language: "Python",
    category: "greedy",
    prompt: "Find the minimum number of jumps needed to reach the last index of an array.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy window boundary tracking", "max() reach updates"],
    code: String.raw`def jump(nums: list[int]) -> int:
    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest

    return jumps`,
  },
  {
    id: "py75-gas-station",
    title: "Gas Station",
    domain: "dsa",
    track: "Greedy",
    language: "Python",
    category: "greedy",
    prompt: "Find the starting gas station index from which a car can complete a full circuit, or -1 if impossible.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running total tracking", "candidate reset logic"],
    code: String.raw`def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost):
        return -1

    total = 0
    start = 0

    for i in range(len(gas)):
        total += gas[i] - cost[i]
        if total < 0:
            start = i + 1
            total = 0

    return start`,
  },
  {
    id: "py75-hand-of-straights",
    title: "Hand of Straights",
    domain: "dsa",
    track: "Greedy",
    language: "Python",
    category: "greedy",
    prompt: "Determine whether cards can be rearranged into groups of consecutive values of a given size.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["Counter with sorted keys", "consecutive run consumption"],
    code: String.raw`from collections import Counter


def is_n_straight_hand(hand: list[int], group_size: int) -> bool:
    if len(hand) % group_size != 0:
        return False

    counts = Counter(hand)

    for card in sorted(counts):
        count = counts[card]
        if count == 0:
            continue

        for offset in range(group_size):
            if counts[card + offset] < count:
                return False
            counts[card + offset] -= count

    return True`,
  },

  // ---------- Intervals ----------
  {
    id: "py75-insert-interval",
    title: "Insert Interval",
    domain: "dsa",
    track: "Intervals",
    language: "Python",
    category: "intervals",
    prompt: "Insert a new interval into a sorted list of non-overlapping intervals, merging as needed.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["interval merging conditions", "list append in loop"],
    code: String.raw`def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    result: list[list[int]] = []
    i = 0
    n = len(intervals)

    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1

    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1

    result.append(new_interval)

    while i < n:
        result.append(intervals[i])
        i += 1

    return result`,
  },
  {
    id: "py75-merge-intervals",
    title: "Merge Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "Python",
    category: "intervals",
    prompt: "Merge all overlapping intervals in a list of intervals.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["sort with lambda key", "merge comparison against last"],
    code: String.raw`def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda pair: pair[0])
    merged: list[list[int]] = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:
            merged[-1][1] = max(last_end, end)
        else:
            merged.append([start, end])

    return merged`,
  },
  {
    id: "py75-non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "Python",
    category: "intervals",
    prompt: "Find the minimum number of intervals to remove so the rest do not overlap.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["greedy sort by end time", "overlap counting"],
    code: String.raw`def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda pair: pair[1])
    removed = 0
    prev_end = float("-inf")

    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removed += 1

    return removed`,
  },
  {
    id: "py75-meeting-rooms",
    title: "Meeting Rooms",
    domain: "dsa",
    track: "Intervals",
    language: "Python",
    category: "intervals",
    prompt: "Determine whether a person can attend all meetings given their time intervals.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["sort by start", "adjacent pair comparison"],
    code: String.raw`def can_attend_meetings(intervals: list[list[int]]) -> bool:
    intervals.sort(key=lambda pair: pair[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False

    return True`,
  },
  {
    id: "py75-meeting-rooms-2",
    title: "Meeting Rooms II",
    domain: "dsa",
    track: "Intervals",
    language: "Python",
    category: "heap + intervals",
    prompt: "Find the minimum number of meeting rooms required to accommodate all given meeting intervals.",
    shikiLang: "python",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["min-heap of end times", "sort by start time"],
    code: String.raw`import heapq


def min_meeting_rooms(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0

    intervals.sort(key=lambda pair: pair[0])
    heap: list[int] = []

    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heapreplace(heap, end)
        else:
            heapq.heappush(heap, end)

    return len(heap)`,
  },

  // ---------- Math & Geometry ----------
  {
    id: "py75-rotate-image",
    title: "Rotate Image",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Python",
    category: "matrix",
    prompt: "Rotate an n x n matrix 90 degrees clockwise in place.",
    shikiLang: "python",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["transpose then reverse", "in-place swaps"],
    code: String.raw`def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for row in matrix:
        row.reverse()`,
  },
  {
    id: "py75-spiral-matrix",
    title: "Spiral Matrix",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Python",
    category: "matrix",
    prompt: "Return all elements of a matrix in spiral order.",
    shikiLang: "python",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["boundary pointer tracking", "four-direction traversal"],
    code: String.raw`def spiral_order(matrix: list[list[int]]) -> list[int]:
    result: list[int] = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result`,
  },
  {
    id: "py75-set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Python",
    category: "matrix",
    prompt: "Set entire rows and columns to zero if any cell in them is zero, using constant extra space.",
    shikiLang: "python",
    optimality: "O(rows * cols) time, O(1) extra space",
    typingFocus: ["first-row/col as markers", "in-place matrix mutation"],
    code: String.raw`def set_zeroes(matrix: list[list[int]]) -> None:
    rows, cols = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][c] == 0 for c in range(cols))
    first_col_zero = any(matrix[r][0] == 0 for r in range(rows))

    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0

    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0

    if first_row_zero:
        for c in range(cols):
            matrix[0][c] = 0

    if first_col_zero:
        for r in range(rows):
            matrix[r][0] = 0`,
  },
  {
    id: "py75-happy-number",
    title: "Happy Number",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Python",
    category: "math",
    prompt: "Determine whether repeatedly summing the squares of a number's digits eventually reaches 1.",
    shikiLang: "python",
    optimality: "O(log n) time per cycle, O(1) space",
    typingFocus: ["digit extraction via divmod", "cycle detection with set"],
    code: String.raw`def is_happy(n: int) -> bool:
    seen: set[int] = set()

    while n != 1 and n not in seen:
        seen.add(n)
        total = 0
        while n > 0:
            n, digit = divmod(n, 10)
            total += digit * digit
        n = total

    return n == 1`,
  },
  {
    id: "py75-pow-x-n",
    title: "Pow(x, n)",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Python",
    category: "math",
    prompt: "Implement exponentiation of a float base to an integer power efficiently.",
    shikiLang: "python",
    optimality: "O(log n) time, O(log n) space",
    typingFocus: ["recursive fast power", "negative exponent handling"],
    code: String.raw`def my_pow(x: float, n: int) -> float:
    if n < 0:
        return 1 / my_pow(x, -n)

    if n == 0:
        return 1.0

    half = my_pow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`,
  },

  // ---------- Bit Manipulation ----------
  {
    id: "py75-single-number",
    title: "Single Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "Find the element that appears only once in an array where every other element appears twice.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor accumulation", "functools.reduce"],
    code: String.raw`from functools import reduce
from operator import xor


def single_number(nums: list[int]) -> int:
    return reduce(xor, nums, 0)`,
  },
  {
    id: "py75-number-of-1-bits",
    title: "Number of 1 Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "Count the number of set bits in the binary representation of an unsigned integer.",
    shikiLang: "python",
    optimality: "O(1) time (32 bits), O(1) space",
    typingFocus: ["bitwise and/shift", "while loop bit peeling"],
    code: String.raw`def hamming_weight(n: int) -> int:
    count = 0

    while n:
        count += n & 1
        n >>= 1

    return count`,
  },
  {
    id: "py75-counting-bits",
    title: "Counting Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "For every number from 0 to n, count the number of set bits in its binary representation.",
    shikiLang: "python",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dp using previous bit counts", "bitwise shift and mask"],
    code: String.raw`def count_bits(n: int) -> list[int]:
    dp = [0] * (n + 1)

    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)

    return dp`,
  },
  {
    id: "py75-reverse-bits",
    title: "Reverse Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "Reverse the bits of a given 32-bit unsigned integer.",
    shikiLang: "python",
    optimality: "O(1) time (32 bits), O(1) space",
    typingFocus: ["bit shifting loop", "result accumulation via or"],
    code: String.raw`def reverse_bits(n: int) -> int:
    result = 0

    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1

    return result`,
  },
  {
    id: "py75-missing-number",
    title: "Missing Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "Find the missing number in an array containing n distinct numbers from 0 to n.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor-based cancellation", "enumerate with index xor"],
    code: String.raw`def missing_number(nums: list[int]) -> int:
    result = len(nums)

    for i, num in enumerate(nums):
        result ^= i ^ num

    return result`,
  },
  {
    id: "py75-sum-of-two-integers",
    title: "Sum of Two Integers",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Python",
    category: "bit manipulation",
    prompt: "Add two integers without using the plus or minus operators.",
    shikiLang: "python",
    optimality: "O(1) time (32-bit bound), O(1) space",
    typingFocus: ["bitmasking for 32-bit overflow", "carry via and/shift"],
    code: String.raw`def get_sum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF

    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry

    a &= mask
    if a > 0x7FFFFFFF:
        return ~(a ^ mask)
    return a`,
  },
];
