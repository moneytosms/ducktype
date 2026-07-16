import type { Snippet } from "@/types/snippet";

export const dsaGoSnippets: Snippet[] = [
  {
    id: "go75-two-sum",
    title: "Two Sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "hashing",
    prompt: "Find indices of two numbers in an array that add up to a target.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["maps", "range loops", "slices"],
    code: String.raw`func twoSum(nums []int, target int) []int {
	seen := make(map[int]int)
	for i, n := range nums {
		if j, ok := seen[target-n]; ok {
			return []int{j, i}
		}
		seen[n] = i
	}
	return nil
}`,
  },
  {
    id: "go75-contains-duplicate",
    title: "Contains Duplicate",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "hashing",
    prompt: "Determine whether an array contains any duplicate values.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["maps", "struct{}", "range loops"],
    code: String.raw`func containsDuplicate(nums []int) bool {
	seen := make(map[int]struct{})
	for _, n := range nums {
		if _, ok := seen[n]; ok {
			return true
		}
		seen[n] = struct{}{}
	}
	return false
}`,
  },
  {
    id: "go75-product-except-self",
    title: "Product of Array Except Self",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "prefix-product",
    prompt: "Build an array where each element is the product of all others without division.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) extra space",
    typingFocus: ["slices", "for loops", "running product"],
    code: String.raw`func productExceptSelf(nums []int) []int {
	n := len(nums)
	res := make([]int, n)
	res[0] = 1
	for i := 1; i < n; i++ {
		res[i] = res[i-1] * nums[i-1]
	}
	right := 1
	for i := n - 1; i >= 0; i-- {
		res[i] *= right
		right *= nums[i]
	}
	return res
}`,
  },
  {
    id: "go75-group-anagrams",
    title: "Group Anagrams",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "hashing",
    prompt: "Group a list of strings into sets of anagrams.",
    shikiLang: "go",
    optimality: "O(n * k log k) time",
    typingFocus: ["maps of slices", "sort.Slice", "byte conversion"],
    code: String.raw`func groupAnagrams(strs []string) [][]string {
	groups := make(map[string][]string)
	for _, s := range strs {
		b := []byte(s)
		sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
		key := string(b)
		groups[key] = append(groups[key], s)
	}
	res := make([][]string, 0, len(groups))
	for _, v := range groups {
		res = append(res, v)
	}
	return res
}`,
  },
  {
    id: "go75-top-k-frequent",
    title: "Top K Frequent Elements",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "bucket-sort",
    prompt: "Return the k most frequent elements in an array.",
    shikiLang: "go",
    optimality: "O(n) time with bucket sort",
    typingFocus: ["maps", "bucket slices", "nested loops"],
    code: String.raw`func topKFrequent(nums []int, k int) []int {
	count := make(map[int]int)
	for _, n := range nums {
		count[n]++
	}
	buckets := make([][]int, len(nums)+1)
	for n, c := range count {
		buckets[c] = append(buckets[c], n)
	}
	res := make([]int, 0, k)
	for i := len(buckets) - 1; i >= 0 && len(res) < k; i-- {
		for _, n := range buckets[i] {
			res = append(res, n)
			if len(res) == k {
				break
			}
		}
	}
	return res
}`,
  },
  {
    id: "go75-encode-decode-strings",
    title: "Encode and Decode Strings",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "string-encoding",
    prompt: "Encode a list of strings into one string and decode it back.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["strconv", "strings.Builder", "index math"],
    code: String.raw`func encode(strs []string) string {
	var b strings.Builder
	for _, s := range strs {
		b.WriteString(strconv.Itoa(len(s)))
		b.WriteByte('#')
		b.WriteString(s)
	}
	return b.String()
}

func decode(s string) []string {
	var res []string
	i := 0
	for i < len(s) {
		j := i
		for s[j] != '#' {
			j++
		}
		length, _ := strconv.Atoi(s[i:j])
		start := j + 1
		res = append(res, s[start:start+length])
		i = start + length
	}
	return res
}`,
  },
  {
    id: "go75-longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "hashing",
    prompt: "Find the length of the longest consecutive sequence of integers in an unsorted array.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["maps", "set membership", "while-style for"],
    code: String.raw`func longestConsecutive(nums []int) int {
	set := make(map[int]struct{})
	for _, n := range nums {
		set[n] = struct{}{}
	}
	best := 0
	for n := range set {
		if _, ok := set[n-1]; ok {
			continue
		}
		length := 1
		for {
			if _, ok := set[n+length]; !ok {
				break
			}
			length++
		}
		if length > best {
			best = length
		}
	}
	return best
}`,
  },
  {
    id: "go75-valid-palindrome",
    title: "Valid Palindrome",
    domain: "dsa",
    track: "Two Pointers",
    language: "Go",
    category: "two-pointers",
    prompt: "Check whether a string is a palindrome ignoring non-alphanumeric characters and case.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["unicode helpers", "two pointer indices", "rune comparisons"],
    code: String.raw`func isPalindrome(s string) bool {
	i, j := 0, len(s)-1
	for i < j {
		for i < j && !isAlnum(s[i]) {
			i++
		}
		for i < j && !isAlnum(s[j]) {
			j--
		}
		if unicode.ToLower(rune(s[i])) != unicode.ToLower(rune(s[j])) {
			return false
		}
		i++
		j--
	}
	return true
}

func isAlnum(b byte) bool {
	return unicode.IsLetter(rune(b)) || unicode.IsDigit(rune(b))
}`,
  },
  {
    id: "go75-two-sum-ii",
    title: "Two Sum II (Sorted Input)",
    domain: "dsa",
    track: "Two Pointers",
    language: "Go",
    category: "two-pointers",
    prompt: "Find two numbers in a sorted array that add up to a target using constant space.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer indices", "conditionals", "returns"],
    code: String.raw`func twoSumSorted(numbers []int, target int) []int {
	i, j := 0, len(numbers)-1
	for i < j {
		sum := numbers[i] + numbers[j]
		switch {
		case sum == target:
			return []int{i + 1, j + 1}
		case sum < target:
			i++
		default:
			j--
		}
	}
	return nil
}`,
  },
  {
    id: "go75-3sum",
    title: "3Sum",
    domain: "dsa",
    track: "Two Pointers",
    language: "Go",
    category: "two-pointers",
    prompt: "Find all unique triplets in an array that sum to zero.",
    shikiLang: "go",
    optimality: "O(n^2) time",
    typingFocus: ["sort.Ints", "nested loops", "duplicate skipping"],
    code: String.raw`func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	var res [][]int
	for i := 0; i < len(nums)-2; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		l, r := i+1, len(nums)-1
		for l < r {
			sum := nums[i] + nums[l] + nums[r]
			switch {
			case sum < 0:
				l++
			case sum > 0:
				r--
			default:
				res = append(res, []int{nums[i], nums[l], nums[r]})
				l++
				for l < r && nums[l] == nums[l-1] {
					l++
				}
			}
		}
	}
	return res
}`,
  },
  {
    id: "go75-container-with-most-water",
    title: "Container With Most Water",
    domain: "dsa",
    track: "Two Pointers",
    language: "Go",
    category: "two-pointers",
    prompt: "Find two lines that together with the x-axis form a container holding the most water.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["min/max helpers", "two pointer indices", "area math"],
    code: String.raw`func maxArea(height []int) int {
	i, j := 0, len(height)-1
	best := 0
	for i < j {
		h := height[i]
		if height[j] < h {
			h = height[j]
		}
		area := h * (j - i)
		if area > best {
			best = area
		}
		if height[i] < height[j] {
			i++
		} else {
			j--
		}
	}
	return best
}`,
  },
  {
    id: "go75-best-time-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    domain: "dsa",
    track: "Sliding Window",
    language: "Go",
    category: "sliding-window",
    prompt: "Find the maximum profit from buying then selling a stock once.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running min", "for loops", "conditionals"],
    code: String.raw`func maxProfit(prices []int) int {
	minPrice := prices[0]
	best := 0
	for _, p := range prices[1:] {
		if p-minPrice > best {
			best = p - minPrice
		}
		if p < minPrice {
			minPrice = p
		}
	}
	return best
}`,
  },
  {
    id: "go75-longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    domain: "dsa",
    track: "Sliding Window",
    language: "Go",
    category: "sliding-window",
    prompt: "Find the length of the longest substring without repeating characters.",
    shikiLang: "go",
    optimality: "O(n) time, O(min(n, m)) space",
    typingFocus: ["maps", "sliding window pointers", "max tracking"],
    code: String.raw`func lengthOfLongestSubstring(s string) int {
	last := make(map[byte]int)
	start, best := 0, 0
	for i := 0; i < len(s); i++ {
		if idx, ok := last[s[i]]; ok && idx >= start {
			start = idx + 1
		}
		last[s[i]] = i
		if i-start+1 > best {
			best = i - start + 1
		}
	}
	return best
}`,
  },
  {
    id: "go75-longest-repeating-char-replacement",
    title: "Longest Repeating Character Replacement",
    domain: "dsa",
    track: "Sliding Window",
    language: "Go",
    category: "sliding-window",
    prompt: "Find the longest substring achievable by replacing at most k characters with any letter.",
    shikiLang: "go",
    optimality: "O(n) time, O(26) space",
    typingFocus: ["fixed-size arrays", "sliding window", "max tracking"],
    code: String.raw`func characterReplacement(s string, k int) int {
	var count [26]int
	start, maxCount, best := 0, 0, 0
	for end := 0; end < len(s); end++ {
		count[s[end]-'A']++
		if count[s[end]-'A'] > maxCount {
			maxCount = count[s[end]-'A']
		}
		for end-start+1-maxCount > k {
			count[s[start]-'A']--
			start++
		}
		if end-start+1 > best {
			best = end - start + 1
		}
	}
	return best
}`,
  },
  {
    id: "go75-minimum-window-substring",
    title: "Minimum Window Substring",
    domain: "dsa",
    track: "Sliding Window",
    language: "Go",
    category: "sliding-window",
    prompt: "Find the smallest substring of s that contains all characters of t.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["maps", "sliding window", "substring slicing"],
    code: String.raw`func minWindow(s string, t string) string {
	if len(t) == 0 {
		return ""
	}
	need := make(map[byte]int)
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	missing := len(t)
	start, end := 0, 0
	left := 0
	for right := 0; right < len(s); right++ {
		if need[s[right]] > 0 {
			missing--
		}
		need[s[right]]--
		for missing == 0 {
			if end == 0 || right-left+1 < end-start {
				start, end = left, right+1
			}
			need[s[left]]++
			if need[s[left]] > 0 {
				missing++
			}
			left++
		}
	}
	return s[start:end]
}`,
  },
  {
    id: "go75-valid-parentheses",
    title: "Valid Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "Go",
    category: "stack",
    prompt: "Determine whether a string of brackets is validly matched and nested.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["slice as stack", "maps", "range loops"],
    code: String.raw`func isValid(s string) bool {
	pairs := map[byte]byte{')': '(', ']': '[', '}': '{'}
	var stack []byte
	for i := 0; i < len(s); i++ {
		c := s[i]
		if open, ok := pairs[c]; ok {
			if len(stack) == 0 || stack[len(stack)-1] != open {
				return false
			}
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, c)
		}
	}
	return len(stack) == 0
}`,
  },
  {
    id: "go75-min-stack",
    title: "Min Stack",
    domain: "dsa",
    track: "Stack",
    language: "Go",
    category: "stack",
    prompt: "Design a stack that supports push, pop, top, and retrieving the minimum in constant time.",
    shikiLang: "go",
    optimality: "O(1) per operation",
    typingFocus: ["struct methods", "slices", "receiver methods"],
    code: String.raw`type MinStack struct {
	data []int
	mins []int
}

func (s *MinStack) Push(val int) {
	s.data = append(s.data, val)
	if len(s.mins) == 0 || val <= s.mins[len(s.mins)-1] {
		s.mins = append(s.mins, val)
	} else {
		s.mins = append(s.mins, s.mins[len(s.mins)-1])
	}
}

func (s *MinStack) Pop() {
	s.data = s.data[:len(s.data)-1]
	s.mins = s.mins[:len(s.mins)-1]
}

func (s *MinStack) Top() int {
	return s.data[len(s.data)-1]
}

func (s *MinStack) GetMin() int {
	return s.mins[len(s.mins)-1]
}`,
  },
  {
    id: "go75-evaluate-rpn",
    title: "Evaluate Reverse Polish Notation",
    domain: "dsa",
    track: "Stack",
    language: "Go",
    category: "stack",
    prompt: "Evaluate an arithmetic expression given in reverse Polish notation.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["switch statements", "strconv.Atoi", "slice as stack"],
    code: String.raw`func evalRPN(tokens []string) int {
	var stack []int
	for _, tok := range tokens {
		switch tok {
		case "+", "-", "*", "/":
			b := stack[len(stack)-1]
			a := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			var res int
			switch tok {
			case "+":
				res = a + b
			case "-":
				res = a - b
			case "*":
				res = a * b
			case "/":
				res = a / b
			}
			stack = append(stack, res)
		default:
			n, _ := strconv.Atoi(tok)
			stack = append(stack, n)
		}
	}
	return stack[0]
}`,
  },
  {
    id: "go75-generate-parentheses",
    title: "Generate Parentheses",
    domain: "dsa",
    track: "Backtracking",
    language: "Go",
    category: "backtracking",
    prompt: "Generate all combinations of well-formed parentheses for n pairs.",
    shikiLang: "go",
    optimality: "O(4^n / sqrt(n)) time",
    typingFocus: ["recursive closures", "string building", "backtracking"],
    code: String.raw`func generateParenthesis(n int) []string {
	var res []string
	var backtrack func(cur string, open, close int)
	backtrack = func(cur string, open, close int) {
		if len(cur) == 2*n {
			res = append(res, cur)
			return
		}
		if open < n {
			backtrack(cur+"(", open+1, close)
		}
		if close < open {
			backtrack(cur+")", open, close+1)
		}
	}
	backtrack("", 0, 0)
	return res
}`,
  },
  {
    id: "go75-daily-temperatures",
    title: "Daily Temperatures",
    domain: "dsa",
    track: "Stack",
    language: "Go",
    category: "monotonic-stack",
    prompt: "For each day, find how many days until a warmer temperature.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack", "index tracking", "for loops"],
    code: String.raw`func dailyTemperatures(temps []int) []int {
	res := make([]int, len(temps))
	var stack []int
	for i, t := range temps {
		for len(stack) > 0 && temps[stack[len(stack)-1]] < t {
			idx := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			res[idx] = i - idx
		}
		stack = append(stack, i)
	}
	return res
}`,
  },
  {
    id: "go75-car-fleet",
    title: "Car Fleet",
    domain: "dsa",
    track: "Stack",
    language: "Go",
    category: "monotonic-stack",
    prompt: "Count how many car fleets arrive at the destination given positions and speeds.",
    shikiLang: "go",
    optimality: "O(n log n) time",
    typingFocus: ["sort.Slice", "structs", "monotonic stack"],
    code: String.raw`func carFleet(target int, position []int, speed []int) int {
	type car struct{ pos, time float64 }
	n := len(position)
	cars := make([]car, n)
	for i := 0; i < n; i++ {
		t := float64(target-position[i]) / float64(speed[i])
		cars[i] = car{float64(position[i]), t}
	}
	sort.Slice(cars, func(i, j int) bool { return cars[i].pos > cars[j].pos })
	fleets := 0
	lastTime := 0.0
	for i, c := range cars {
		if i == 0 || c.time > lastTime {
			fleets++
			lastTime = c.time
		}
	}
	return fleets
}`,
  },
  {
    id: "go75-binary-search",
    title: "Binary Search",
    domain: "dsa",
    track: "Binary Search",
    language: "Go",
    category: "binary-search",
    prompt: "Find the index of a target value in a sorted array.",
    shikiLang: "go",
    optimality: "O(log n) time",
    typingFocus: ["for loops", "mid calculation", "conditionals"],
    code: String.raw`func search(nums []int, target int) int {
	lo, hi := 0, len(nums)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		switch {
		case nums[mid] == target:
			return mid
		case nums[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}`,
  },
  {
    id: "go75-search-2d-matrix",
    title: "Search a 2D Matrix",
    domain: "dsa",
    track: "Binary Search",
    language: "Go",
    category: "binary-search",
    prompt: "Search for a target value in a matrix sorted row-wise and column-wise.",
    shikiLang: "go",
    optimality: "O(log(m*n)) time",
    typingFocus: ["2D indexing", "division and modulo", "binary search"],
    code: String.raw`func searchMatrix(matrix [][]int, target int) bool {
	rows, cols := len(matrix), len(matrix[0])
	lo, hi := 0, rows*cols-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		val := matrix[mid/cols][mid%cols]
		switch {
		case val == target:
			return true
		case val < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return false
}`,
  },
  {
    id: "go75-koko-eating-bananas",
    title: "Koko Eating Bananas",
    domain: "dsa",
    track: "Binary Search",
    language: "Go",
    category: "binary-search-answer",
    prompt: "Find the minimum eating speed so Koko finishes all banana piles within h hours.",
    shikiLang: "go",
    optimality: "O(n log m) time",
    typingFocus: ["binary search on answer", "ceiling division", "helper functions"],
    code: String.raw`func minEatingSpeed(piles []int, h int) int {
	lo, hi := 1, 0
	for _, p := range piles {
		if p > hi {
			hi = p
		}
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		hours := 0
		for _, p := range piles {
			hours += (p + mid - 1) / mid
		}
		if hours <= h {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}`,
  },
  {
    id: "go75-find-minimum-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Go",
    category: "binary-search",
    prompt: "Find the minimum element in a rotated sorted array with no duplicates.",
    shikiLang: "go",
    optimality: "O(log n) time",
    typingFocus: ["binary search", "conditionals", "pointer narrowing"],
    code: String.raw`func findMin(nums []int) int {
	lo, hi := 0, len(nums)-1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if nums[mid] > nums[hi] {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return nums[lo]
}`,
  },
  {
    id: "go75-search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "Go",
    category: "binary-search",
    prompt: "Search for a target value in a rotated sorted array.",
    shikiLang: "go",
    optimality: "O(log n) time",
    typingFocus: ["binary search", "nested conditionals", "range checks"],
    code: String.raw`func searchRotated(nums []int, target int) int {
	lo, hi := 0, len(nums)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if nums[mid] == target {
			return mid
		}
		if nums[lo] <= nums[mid] {
			if nums[lo] <= target && target < nums[mid] {
				hi = mid - 1
			} else {
				lo = mid + 1
			}
		} else {
			if nums[mid] < target && target <= nums[hi] {
				lo = mid + 1
			} else {
				hi = mid - 1
			}
		}
	}
	return -1
}`,
  },
  {
    id: "go75-reverse-linked-list",
    title: "Reverse Linked List",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Reverse a singly linked list in place.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["struct pointers", "nil checks", "pointer swapping"],
    code: String.raw`type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
	var prev *ListNode
	cur := head
	for cur != nil {
		next := cur.Next
		cur.Next = prev
		prev = cur
		cur = next
	}
	return prev
}`,
  },
  {
    id: "go75-merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Merge two sorted linked lists into one sorted linked list.",
    shikiLang: "go",
    optimality: "O(n + m) time",
    typingFocus: ["dummy node pattern", "pointer traversal", "struct pointers"],
    code: String.raw`func mergeTwoLists(l1, l2 *ListNode) *ListNode {
	dummy := &ListNode{}
	tail := dummy
	for l1 != nil && l2 != nil {
		if l1.Val <= l2.Val {
			tail.Next = l1
			l1 = l1.Next
		} else {
			tail.Next = l2
			l2 = l2.Next
		}
		tail = tail.Next
	}
	if l1 != nil {
		tail.Next = l1
	} else {
		tail.Next = l2
	}
	return dummy.Next
}`,
  },
  {
    id: "go75-reorder-list",
    title: "Reorder List",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Reorder a linked list by interleaving the first and second halves in reverse.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "in-place reversal", "pointer interleaving"],
    code: String.raw`func reorderList(head *ListNode) {
	slow, fast := head, head
	for fast.Next != nil && fast.Next.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	second := reverseList(slow.Next)
	slow.Next = nil
	first := head
	for second != nil {
		firstNext := first.Next
		secondNext := second.Next
		first.Next = second
		second.Next = firstNext
		first = firstNext
		second = secondNext
	}
}`,
  },
  {
    id: "go75-remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Remove the nth node from the end of a linked list in one pass.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["dummy node pattern", "two pointer gap", "pointer traversal"],
    code: String.raw`func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{Next: head}
	fast, slow := dummy, dummy
	for i := 0; i < n; i++ {
		fast = fast.Next
	}
	for fast.Next != nil {
		fast = fast.Next
		slow = slow.Next
	}
	slow.Next = slow.Next.Next
	return dummy.Next
}`,
  },
  {
    id: "go75-linked-list-cycle",
    title: "Linked List Cycle",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Determine whether a linked list contains a cycle.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "nil checks", "loops"],
    code: String.raw`func hasCycle(head *ListNode) bool {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
		if slow == fast {
			return true
		}
	}
	return false
}`,
  },
  {
    id: "go75-merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Go",
    category: "heap",
    prompt: "Merge k sorted linked lists into a single sorted linked list.",
    shikiLang: "go",
    optimality: "O(n log k) time",
    typingFocus: ["container/heap interface", "heap methods", "dummy node pattern"],
    code: String.raw`type nodeHeap []*ListNode

func (h nodeHeap) Len() int            { return len(h) }
func (h nodeHeap) Less(i, j int) bool  { return h[i].Val < h[j].Val }
func (h nodeHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *nodeHeap) Push(x interface{}) { *h = append(*h, x.(*ListNode)) }
func (h *nodeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func mergeKLists(lists []*ListNode) *ListNode {
	h := &nodeHeap{}
	heap.Init(h)
	for _, l := range lists {
		if l != nil {
			heap.Push(h, l)
		}
	}
	dummy := &ListNode{}
	tail := dummy
	for h.Len() > 0 {
		node := heap.Pop(h).(*ListNode)
		tail.Next = node
		tail = tail.Next
		if node.Next != nil {
			heap.Push(h, node.Next)
		}
	}
	return dummy.Next
}`,
  },
  {
    id: "go75-invert-binary-tree",
    title: "Invert Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Invert a binary tree by swapping every left and right child.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["recursive functions", "struct pointers", "nil checks"],
    code: String.raw`type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
	return root
}`,
  },
  {
    id: "go75-max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Find the maximum depth of a binary tree.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["recursion", "max helper", "nil checks"],
    code: String.raw`func maxDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	l := maxDepth(root.Left)
	r := maxDepth(root.Right)
	if l > r {
		return l + 1
	}
	return r + 1
}`,
  },
  {
    id: "go75-same-tree",
    title: "Same Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Determine whether two binary trees are structurally identical with the same values.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["recursion", "boolean logic", "nil checks"],
    code: String.raw`func isSameTree(p, q *TreeNode) bool {
	if p == nil && q == nil {
		return true
	}
	if p == nil || q == nil || p.Val != q.Val {
		return false
	}
	return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
}`,
  },
  {
    id: "go75-subtree-of-another-tree",
    title: "Subtree of Another Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Determine whether one binary tree is a subtree of another.",
    shikiLang: "go",
    optimality: "O(n * m) time",
    typingFocus: ["recursion", "helper functions", "boolean short-circuit"],
    code: String.raw`func isSubtree(root, subRoot *TreeNode) bool {
	if root == nil {
		return false
	}
	if isSameTree(root, subRoot) {
		return true
	}
	return isSubtree(root.Left, subRoot) || isSubtree(root.Right, subRoot)
}`,
  },
  {
    id: "go75-lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Find the lowest common ancestor of two nodes in a binary search tree.",
    shikiLang: "go",
    optimality: "O(log n) average time",
    typingFocus: ["BST property", "iterative loops", "conditionals"],
    code: String.raw`func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	cur := root
	for cur != nil {
		switch {
		case p.Val < cur.Val && q.Val < cur.Val:
			cur = cur.Left
		case p.Val > cur.Val && q.Val > cur.Val:
			cur = cur.Right
		default:
			return cur
		}
	}
	return nil
}`,
  },
  {
    id: "go75-binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Return the level order traversal of a binary tree's node values.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["queue via slices", "BFS loop", "nested loops"],
    code: String.raw`func levelOrder(root *TreeNode) [][]int {
	if root == nil {
		return nil
	}
	var res [][]int
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		size := len(queue)
		level := make([]int, 0, size)
		for i := 0; i < size; i++ {
			node := queue[0]
			queue = queue[1:]
			level = append(level, node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		res = append(res, level)
	}
	return res
}`,
  },
  {
    id: "go75-validate-bst",
    title: "Validate Binary Search Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Determine whether a binary tree satisfies the binary search tree property.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["recursive bounds", "math.MinInt64", "nil checks"],
    code: String.raw`func isValidBST(root *TreeNode) bool {
	var valid func(node *TreeNode, lo, hi int64) bool
	valid = func(node *TreeNode, lo, hi int64) bool {
		if node == nil {
			return true
		}
		v := int64(node.Val)
		if v <= lo || v >= hi {
			return false
		}
		return valid(node.Left, lo, v) && valid(node.Right, v, hi)
	}
	return valid(root, math.MinInt64, math.MaxInt64)
}`,
  },
  {
    id: "go75-kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Find the kth smallest value in a binary search tree.",
    shikiLang: "go",
    optimality: "O(h + k) time",
    typingFocus: ["iterative in-order traversal", "slice as stack", "counters"],
    code: String.raw`func kthSmallest(root *TreeNode, k int) int {
	var stack []*TreeNode
	cur := root
	for {
		for cur != nil {
			stack = append(stack, cur)
			cur = cur.Left
		}
		cur = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		k--
		if k == 0 {
			return cur.Val
		}
		cur = cur.Right
	}
}`,
  },
  {
    id: "go75-construct-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Rebuild a binary tree given its preorder and inorder traversals.",
    shikiLang: "go",
    optimality: "O(n) time with index map",
    typingFocus: ["maps", "recursion", "slice indexing"],
    code: String.raw`func buildTree(preorder, inorder []int) *TreeNode {
	idx := make(map[int]int)
	for i, v := range inorder {
		idx[v] = i
	}
	pre := 0
	var build func(inLo, inHi int) *TreeNode
	build = func(inLo, inHi int) *TreeNode {
		if inLo > inHi {
			return nil
		}
		rootVal := preorder[pre]
		pre++
		root := &TreeNode{Val: rootVal}
		mid := idx[rootVal]
		root.Left = build(inLo, mid-1)
		root.Right = build(mid+1, inHi)
		return root
	}
	return build(0, len(inorder)-1)
}`,
  },
  {
    id: "go75-binary-tree-max-path-sum",
    title: "Binary Tree Maximum Path Sum",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Find the maximum path sum between any two nodes in a binary tree.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["closures", "max helper", "pointer mutation via captured var"],
    code: String.raw`func maxPathSum(root *TreeNode) int {
	best := math.MinInt32
	var gain func(node *TreeNode) int
	gain = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		l := max(gain(node.Left), 0)
		r := max(gain(node.Right), 0)
		if node.Val+l+r > best {
			best = node.Val + l + r
		}
		return node.Val + max(l, r)
	}
	gain(root)
	return best
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}`,
  },
  {
    id: "go75-serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "Go",
    category: "trees",
    prompt: "Design an algorithm to serialize a binary tree to a string and deserialize it back.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["strings.Builder", "strings.Split", "recursive helpers"],
    code: String.raw`func serialize(root *TreeNode) string {
	var b strings.Builder
	var dfs func(node *TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			b.WriteString("#,")
			return
		}
		b.WriteString(strconv.Itoa(node.Val))
		b.WriteByte(',')
		dfs(node.Left)
		dfs(node.Right)
	}
	dfs(root)
	return b.String()
}

func deserialize(data string) *TreeNode {
	vals := strings.Split(data, ",")
	i := 0
	var build func() *TreeNode
	build = func() *TreeNode {
		v := vals[i]
		i++
		if v == "#" {
			return nil
		}
		n, _ := strconv.Atoi(v)
		node := &TreeNode{Val: n}
		node.Left = build()
		node.Right = build()
		return node
	}
	return build()
}`,
  },
  {
    id: "go75-implement-trie",
    title: "Implement Trie (Prefix Tree)",
    domain: "dsa",
    track: "Tries",
    language: "Go",
    category: "tries",
    prompt: "Implement a trie supporting insert, search, and prefix search operations.",
    shikiLang: "go",
    optimality: "O(k) time per operation",
    typingFocus: ["struct with map children", "receiver methods", "boolean flags"],
    code: String.raw`type Trie struct {
	children map[byte]*Trie
	end      bool
}

func newTrie() *Trie {
	return &Trie{children: make(map[byte]*Trie)}
}

func (t *Trie) Insert(word string) {
	cur := t
	for i := 0; i < len(word); i++ {
		c := word[i]
		if cur.children[c] == nil {
			cur.children[c] = newTrie()
		}
		cur = cur.children[c]
	}
	cur.end = true
}

func (t *Trie) find(word string) *Trie {
	cur := t
	for i := 0; i < len(word); i++ {
		c := word[i]
		if cur.children[c] == nil {
			return nil
		}
		cur = cur.children[c]
	}
	return cur
}

func (t *Trie) Search(word string) bool {
	node := t.find(word)
	return node != nil && node.end
}

func (t *Trie) StartsWith(prefix string) bool {
	return t.find(prefix) != nil
}`,
  },
  {
    id: "go75-word-search-ii",
    title: "Word Search II",
    domain: "dsa",
    track: "Tries",
    language: "Go",
    category: "tries",
    prompt: "Find all words from a dictionary that can be formed on a letter grid via adjacent cells.",
    shikiLang: "go",
    optimality: "O(m*n*4^L) time with trie pruning",
    typingFocus: ["trie traversal", "DFS backtracking", "grid bounds checks"],
    code: String.raw`func findWords(board [][]byte, words []string) []string {
	trie := newTrie()
	for _, w := range words {
		trie.Insert(w)
	}
	rows, cols := len(board), len(board[0])
	seen := make(map[string]struct{})
	var dfs func(r, c int, node *Trie, path []byte)
	dfs = func(r, c int, node *Trie, path []byte) {
		if r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] == '#' {
			return
		}
		ch := board[r][c]
		next, ok := node.children[ch]
		if !ok {
			return
		}
		path = append(path, ch)
		if next.end {
			seen[string(path)] = struct{}{}
		}
		board[r][c] = '#'
		dfs(r+1, c, next, path)
		dfs(r-1, c, next, path)
		dfs(r, c+1, next, path)
		dfs(r, c-1, next, path)
		board[r][c] = ch
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			dfs(r, c, trie, nil)
		}
	}
	res := make([]string, 0, len(seen))
	for w := range seen {
		res = append(res, w)
	}
	return res
}`,
  },
  {
    id: "go75-kth-largest-stream",
    title: "Kth Largest Element in a Stream",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Go",
    category: "heap",
    prompt: "Design a class that tracks the kth largest element as new values are added to a stream.",
    shikiLang: "go",
    optimality: "O(log k) per add",
    typingFocus: ["container/heap interface", "min-heap of size k", "struct methods"],
    code: String.raw`type IntHeap []int

func (h IntHeap) Len() int            { return len(h) }
func (h IntHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

type KthLargest struct {
	k int
	h *IntHeap
}

func Constructor(k int, nums []int) KthLargest {
	h := &IntHeap{}
	heap.Init(h)
	kl := KthLargest{k: k, h: h}
	for _, n := range nums {
		kl.Add(n)
	}
	return kl
}

func (kl *KthLargest) Add(val int) int {
	heap.Push(kl.h, val)
	if kl.h.Len() > kl.k {
		heap.Pop(kl.h)
	}
	return (*kl.h)[0]
}`,
  },
  {
    id: "go75-find-median-data-stream",
    title: "Find Median from Data Stream",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Go",
    category: "heap",
    prompt: "Design a data structure that supports adding numbers and finding the median efficiently.",
    shikiLang: "go",
    optimality: "O(log n) per add, O(1) median",
    typingFocus: ["two heaps", "container/heap interface", "balancing logic"],
    code: String.raw`type MaxHeap []int

func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

type MedianFinder struct {
	small *MaxHeap
	large *IntHeap
}

func (mf *MedianFinder) AddNum(num int) {
	heap.Push(mf.small, num)
	heap.Push(mf.large, heap.Pop(mf.small))
	if mf.large.Len() > mf.small.Len() {
		heap.Push(mf.small, heap.Pop(mf.large))
	}
}

func (mf *MedianFinder) FindMedian() float64 {
	if mf.small.Len() > mf.large.Len() {
		return float64((*mf.small)[0])
	}
	return float64((*mf.small)[0]+(*mf.large)[0]) / 2.0
}`,
  },
  {
    id: "go75-subsets",
    title: "Subsets",
    domain: "dsa",
    track: "Backtracking",
    language: "Go",
    category: "backtracking",
    prompt: "Return all possible subsets of a set of distinct integers.",
    shikiLang: "go",
    optimality: "O(2^n) time",
    typingFocus: ["recursive backtracking", "slice copying", "append/pop"],
    code: String.raw`func subsets(nums []int) [][]int {
	var res [][]int
	var cur []int
	var backtrack func(start int)
	backtrack = func(start int) {
		copied := make([]int, len(cur))
		copy(copied, cur)
		res = append(res, copied)
		for i := start; i < len(nums); i++ {
			cur = append(cur, nums[i])
			backtrack(i + 1)
			cur = cur[:len(cur)-1]
		}
	}
	backtrack(0)
	return res
}`,
  },
  {
    id: "go75-combination-sum",
    title: "Combination Sum",
    domain: "dsa",
    track: "Backtracking",
    language: "Go",
    category: "backtracking",
    prompt: "Find all unique combinations of candidates that sum to a target, reusing numbers freely.",
    shikiLang: "go",
    optimality: "O(2^t) time in the worst case",
    typingFocus: ["recursive backtracking", "slice copying", "sum tracking"],
    code: String.raw`func combinationSum(candidates []int, target int) [][]int {
	var res [][]int
	var cur []int
	var backtrack func(start, remain int)
	backtrack = func(start, remain int) {
		if remain == 0 {
			copied := make([]int, len(cur))
			copy(copied, cur)
			res = append(res, copied)
			return
		}
		if remain < 0 {
			return
		}
		for i := start; i < len(candidates); i++ {
			cur = append(cur, candidates[i])
			backtrack(i, remain-candidates[i])
			cur = cur[:len(cur)-1]
		}
	}
	backtrack(0, target)
	return res
}`,
  },
  {
    id: "go75-permutations",
    title: "Permutations",
    domain: "dsa",
    track: "Backtracking",
    language: "Go",
    category: "backtracking",
    prompt: "Return all possible permutations of a list of distinct integers.",
    shikiLang: "go",
    optimality: "O(n!) time",
    typingFocus: ["recursive backtracking", "used-boolean slice", "slice copying"],
    code: String.raw`func permute(nums []int) [][]int {
	var res [][]int
	var cur []int
	used := make([]bool, len(nums))
	var backtrack func()
	backtrack = func() {
		if len(cur) == len(nums) {
			copied := make([]int, len(cur))
			copy(copied, cur)
			res = append(res, copied)
			return
		}
		for i, n := range nums {
			if used[i] {
				continue
			}
			used[i] = true
			cur = append(cur, n)
			backtrack()
			cur = cur[:len(cur)-1]
			used[i] = false
		}
	}
	backtrack()
	return res
}`,
  },
  {
    id: "go75-word-search",
    title: "Word Search",
    domain: "dsa",
    track: "Backtracking",
    language: "Go",
    category: "backtracking",
    prompt: "Determine whether a word can be constructed from adjacent letters on a grid.",
    shikiLang: "go",
    optimality: "O(m*n*4^L) time",
    typingFocus: ["DFS backtracking", "grid bounds checks", "in-place marking"],
    code: String.raw`func exist(board [][]byte, word string) bool {
	rows, cols := len(board), len(board[0])
	var dfs func(r, c, i int) bool
	dfs = func(r, c, i int) bool {
		if i == len(word) {
			return true
		}
		if r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i] {
			return false
		}
		tmp := board[r][c]
		board[r][c] = '#'
		found := dfs(r+1, c, i+1) || dfs(r-1, c, i+1) || dfs(r, c+1, i+1) || dfs(r, c-1, i+1)
		board[r][c] = tmp
		return found
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if dfs(r, c, 0) {
				return true
			}
		}
	}
	return false
}`,
  },
  {
    id: "go75-number-of-islands",
    title: "Number of Islands",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Count the number of islands of connected land cells in a grid.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["DFS on grid", "bounds checks", "in-place marking"],
    code: String.raw`func numIslands(grid [][]byte) int {
	rows, cols := len(grid), len(grid[0])
	var dfs func(r, c int)
	dfs = func(r, c int) {
		if r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != '1' {
			return
		}
		grid[r][c] = '0'
		dfs(r+1, c)
		dfs(r-1, c)
		dfs(r, c+1)
		dfs(r, c-1)
	}
	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++
				dfs(r, c)
			}
		}
	}
	return count
}`,
  },
  {
    id: "go75-clone-graph",
    title: "Clone Graph",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Create a deep copy of a connected undirected graph.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["maps for visited nodes", "recursion", "struct pointers"],
    code: String.raw`type Node struct {
	Val       int
	Neighbors []*Node
}

func cloneGraph(node *Node) *Node {
	visited := make(map[*Node]*Node)
	var dfs func(n *Node) *Node
	dfs = func(n *Node) *Node {
		if n == nil {
			return nil
		}
		if clone, ok := visited[n]; ok {
			return clone
		}
		clone := &Node{Val: n.Val}
		visited[n] = clone
		for _, nb := range n.Neighbors {
			clone.Neighbors = append(clone.Neighbors, dfs(nb))
		}
		return clone
	}
	return dfs(node)
}`,
  },
  {
    id: "go75-max-area-of-island",
    title: "Max Area of Island",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Find the largest area of connected land cells in a grid.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["DFS on grid", "max tracking", "recursion return values"],
    code: String.raw`func maxAreaOfIsland(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	var dfs func(r, c int) int
	dfs = func(r, c int) int {
		if r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == 0 {
			return 0
		}
		grid[r][c] = 0
		return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
	}
	best := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				if area := dfs(r, c); area > best {
					best = area
				}
			}
		}
	}
	return best
}`,
  },
  {
    id: "go75-pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Find cells from which water can flow to both the Pacific and Atlantic oceans.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["multi-source DFS", "2D boolean grids", "set intersection"],
    code: String.raw`func pacificAtlantic(heights [][]int) [][]int {
	rows, cols := len(heights), len(heights[0])
	pacific := make([][]bool, rows)
	atlantic := make([][]bool, rows)
	for i := range pacific {
		pacific[i] = make([]bool, cols)
		atlantic[i] = make([]bool, cols)
	}
	var dfs func(r, c int, visited [][]bool, prevHeight int)
	dfs = func(r, c int, visited [][]bool, prevHeight int) {
		if r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || heights[r][c] < prevHeight {
			return
		}
		visited[r][c] = true
		dfs(r+1, c, visited, heights[r][c])
		dfs(r-1, c, visited, heights[r][c])
		dfs(r, c+1, visited, heights[r][c])
		dfs(r, c-1, visited, heights[r][c])
	}
	for r := 0; r < rows; r++ {
		dfs(r, 0, pacific, heights[r][0])
		dfs(r, cols-1, atlantic, heights[r][cols-1])
	}
	for c := 0; c < cols; c++ {
		dfs(0, c, pacific, heights[0][c])
		dfs(rows-1, c, atlantic, heights[rows-1][c])
	}
	var res [][]int
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if pacific[r][c] && atlantic[r][c] {
				res = append(res, []int{r, c})
			}
		}
	}
	return res
}`,
  },
  {
    id: "go75-surrounded-regions",
    title: "Surrounded Regions",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Capture all regions of 'O's that are not connected to the border by flipping them to 'X'.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["DFS marking", "border traversal", "grid mutation"],
    code: String.raw`func solve(board [][]byte) {
	rows, cols := len(board), len(board[0])
	var dfs func(r, c int)
	dfs = func(r, c int) {
		if r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != 'O' {
			return
		}
		board[r][c] = 'S'
		dfs(r+1, c)
		dfs(r-1, c)
		dfs(r, c+1)
		dfs(r, c-1)
	}
	for r := 0; r < rows; r++ {
		dfs(r, 0)
		dfs(r, cols-1)
	}
	for c := 0; c < cols; c++ {
		dfs(0, c)
		dfs(rows-1, c)
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			switch board[r][c] {
			case 'O':
				board[r][c] = 'X'
			case 'S':
				board[r][c] = 'O'
			}
		}
	}
}`,
  },
  {
    id: "go75-rotting-oranges",
    title: "Rotting Oranges",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Find the minimum minutes until no fresh orange remains, as rot spreads to adjacent cells each minute.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["multi-source BFS", "queue via slices", "grid traversal"],
    code: String.raw`func orangesRotting(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	type cell struct{ r, c int }
	var queue []cell
	fresh := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			switch grid[r][c] {
			case 2:
				queue = append(queue, cell{r, c})
			case 1:
				fresh++
			}
		}
	}
	minutes := 0
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for len(queue) > 0 && fresh > 0 {
		size := len(queue)
		for i := 0; i < size; i++ {
			cur := queue[0]
			queue = queue[1:]
			for _, d := range dirs {
				nr, nc := cur.r+d[0], cur.c+d[1]
				if nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] == 1 {
					grid[nr][nc] = 2
					fresh--
					queue = append(queue, cell{nr, nc})
				}
			}
		}
		minutes++
	}
	if fresh > 0 {
		return -1
	}
	return minutes
}`,
  },
  {
    id: "go75-course-schedule",
    title: "Course Schedule",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "graphs",
    prompt: "Determine whether it is possible to finish all courses given their prerequisites.",
    shikiLang: "go",
    optimality: "O(V + E) time",
    typingFocus: ["adjacency list", "cycle detection via DFS states", "maps of slices"],
    code: String.raw`func canFinish(numCourses int, prerequisites [][]int) bool {
	graph := make(map[int][]int)
	for _, p := range prerequisites {
		graph[p[0]] = append(graph[p[0]], p[1])
	}
	state := make([]int, numCourses)
	var dfs func(course int) bool
	dfs = func(course int) bool {
		if state[course] == 1 {
			return false
		}
		if state[course] == 2 {
			return true
		}
		state[course] = 1
		for _, next := range graph[course] {
			if !dfs(next) {
				return false
			}
		}
		state[course] = 2
		return true
	}
	for c := 0; c < numCourses; c++ {
		if !dfs(c) {
			return false
		}
	}
	return true
}`,
  },
  {
    id: "go75-graph-valid-tree",
    title: "Graph Valid Tree",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "union-find",
    prompt: "Determine whether a graph of n nodes and given edges forms a valid tree.",
    shikiLang: "go",
    optimality: "O(n * alpha(n)) time",
    typingFocus: ["union-find", "path compression", "slice-backed parent array"],
    code: String.raw`func validTree(n int, edges [][]int) bool {
	if len(edges) != n-1 {
		return false
	}
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	var find func(x int) int
	find = func(x int) int {
		if parent[x] != x {
			parent[x] = find(parent[x])
		}
		return parent[x]
	}
	for _, e := range edges {
		r1, r2 := find(e[0]), find(e[1])
		if r1 == r2 {
			return false
		}
		parent[r1] = r2
	}
	return true
}`,
  },
  {
    id: "go75-number-of-connected-components",
    title: "Number of Connected Components in an Undirected Graph",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "union-find",
    prompt: "Count the number of connected components in an undirected graph.",
    shikiLang: "go",
    optimality: "O(n * alpha(n)) time",
    typingFocus: ["union-find", "path compression", "component counting"],
    code: String.raw`func countComponents(n int, edges [][]int) int {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	var find func(x int) int
	find = func(x int) int {
		if parent[x] != x {
			parent[x] = find(parent[x])
		}
		return parent[x]
	}
	count := n
	for _, e := range edges {
		r1, r2 := find(e[0]), find(e[1])
		if r1 != r2 {
			parent[r1] = r2
			count--
		}
	}
	return count
}`,
  },
  {
    id: "go75-alien-dictionary",
    title: "Alien Dictionary",
    domain: "dsa",
    track: "Graphs",
    language: "Go",
    category: "topological-sort",
    prompt: "Derive the character order of an alien alphabet from a sorted list of words.",
    shikiLang: "go",
    optimality: "O(C) time over total characters",
    typingFocus: ["topological sort", "adjacency sets", "cycle detection"],
    code: String.raw`func alienOrder(words []string) string {
	graph := make(map[byte]map[byte]struct{})
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			if graph[w[i]] == nil {
				graph[w[i]] = make(map[byte]struct{})
			}
		}
	}
	for i := 0; i < len(words)-1; i++ {
		a, b := words[i], words[i+1]
		minLen := len(a)
		if len(b) < minLen {
			minLen = len(b)
		}
		found := false
		for j := 0; j < minLen; j++ {
			if a[j] != b[j] {
				graph[a[j]][b[j]] = struct{}{}
				found = true
				break
			}
		}
		if !found && len(a) > len(b) {
			return ""
		}
	}
	state := make(map[byte]int)
	var order []byte
	var dfs func(c byte) bool
	dfs = func(c byte) bool {
		if state[c] == 1 {
			return false
		}
		if state[c] == 2 {
			return true
		}
		state[c] = 1
		for next := range graph[c] {
			if !dfs(next) {
				return false
			}
		}
		state[c] = 2
		order = append(order, c)
		return true
	}
	for c := range graph {
		if !dfs(c) {
			return ""
		}
	}
	for i, j := 0, len(order)-1; i < j; i, j = i+1, j-1 {
		order[i], order[j] = order[j], order[i]
	}
	return string(order)
}`,
  },
  {
    id: "go75-climbing-stairs",
    title: "Climbing Stairs",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Count how many distinct ways there are to climb n stairs taking one or two steps at a time.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["variable swapping", "for loops", "returns"],
    code: String.raw`func climbStairs(n int) int {
	prev, curr := 1, 1
	for i := 2; i <= n; i++ {
		prev, curr = curr, prev+curr
	}
	return curr
}`,
  },
  {
    id: "go75-house-robber",
    title: "House Robber",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the maximum amount that can be robbed from houses in a row without robbing two adjacent ones.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variables", "max helper", "for loops"],
    code: String.raw`func rob(nums []int) int {
	prev, curr := 0, 0
	for _, n := range nums {
		prev, curr = curr, max(curr, prev+n)
	}
	return curr
}`,
  },
  {
    id: "go75-house-robber-ii",
    title: "House Robber II",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Solve House Robber where houses are arranged in a circle.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["helper function reuse", "slicing", "circular handling"],
    code: String.raw`func robCircular(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}
	robLine := func(houses []int) int {
		prev, curr := 0, 0
		for _, n := range houses {
			prev, curr = curr, max(curr, prev+n)
		}
		return curr
	}
	return max(robLine(nums[:len(nums)-1]), robLine(nums[1:]))
}`,
  },
  {
    id: "go75-longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the longest palindromic substring within a string.",
    shikiLang: "go",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand around center", "helper functions", "substring slicing"],
    code: String.raw`func longestPalindrome(s string) string {
	start, end := 0, 0
	expand := func(l, r int) (int, int) {
		for l >= 0 && r < len(s) && s[l] == s[r] {
			l--
			r++
		}
		return l + 1, r - 1
	}
	for i := 0; i < len(s); i++ {
		l1, r1 := expand(i, i)
		if r1-l1 > end-start {
			start, end = l1, r1
		}
		l2, r2 := expand(i, i+1)
		if r2-l2 > end-start {
			start, end = l2, r2
		}
	}
	return s[start : end+1]
}`,
  },
  {
    id: "go75-palindromic-substrings",
    title: "Palindromic Substrings",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Count how many palindromic substrings a string contains.",
    shikiLang: "go",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand around center", "counters", "for loops"],
    code: String.raw`func countSubstrings(s string) int {
	count := 0
	expand := func(l, r int) {
		for l >= 0 && r < len(s) && s[l] == s[r] {
			count++
			l--
			r++
		}
	}
	for i := 0; i < len(s); i++ {
		expand(i, i)
		expand(i, i+1)
	}
	return count
}`,
  },
  {
    id: "go75-decode-ways",
    title: "Decode Ways",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Count the number of ways to decode a digit string into letters A-Z.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling dp variables", "string byte indexing", "conditionals"],
    code: String.raw`func numDecodings(s string) int {
	if len(s) == 0 || s[0] == '0' {
		return 0
	}
	prev, curr := 1, 1
	for i := 1; i < len(s); i++ {
		next := 0
		if s[i] != '0' {
			next += curr
		}
		two := (s[i-1]-'0')*10 + (s[i] - '0')
		if two >= 10 && two <= 26 {
			next += prev
		}
		prev, curr = curr, next
	}
	return curr
}`,
  },
  {
    id: "go75-coin-change",
    title: "Coin Change",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the fewest number of coins needed to make up a given amount.",
    shikiLang: "go",
    optimality: "O(amount * coins) time",
    typingFocus: ["dp arrays", "math.MaxInt32 sentinel", "nested loops"],
    code: String.raw`func coinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	for i := 1; i <= amount; i++ {
		dp[i] = math.MaxInt32
		for _, c := range coins {
			if c <= i && dp[i-c]+1 < dp[i] {
				dp[i] = dp[i-c] + 1
			}
		}
	}
	if dp[amount] == math.MaxInt32 {
		return -1
	}
	return dp[amount]
}`,
  },
  {
    id: "go75-maximum-product-subarray",
    title: "Maximum Product Subarray",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the contiguous subarray with the largest product.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["min/max tracking", "sign swapping", "for loops"],
    code: String.raw`func maxProduct(nums []int) int {
	res, curMax, curMin := nums[0], nums[0], nums[0]
	for _, n := range nums[1:] {
		if n < 0 {
			curMax, curMin = curMin, curMax
		}
		curMax = max(n, curMax*n)
		curMin = min(n, curMin*n)
		if curMax > res {
			res = curMax
		}
	}
	return res
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}`,
  },
  {
    id: "go75-word-break",
    title: "Word Break",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Determine whether a string can be segmented into words from a dictionary.",
    shikiLang: "go",
    optimality: "O(n^2) time",
    typingFocus: ["boolean dp array", "map lookups", "substring slicing"],
    code: String.raw`func wordBreak(s string, wordDict []string) bool {
	words := make(map[string]struct{})
	for _, w := range wordDict {
		words[w] = struct{}{}
	}
	dp := make([]bool, len(s)+1)
	dp[0] = true
	for i := 1; i <= len(s); i++ {
		for j := 0; j < i; j++ {
			if dp[j] {
				if _, ok := words[s[j:i]]; ok {
					dp[i] = true
					break
				}
			}
		}
	}
	return dp[len(s)]
}`,
  },
  {
    id: "go75-longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the length of the longest strictly increasing subsequence in an array.",
    shikiLang: "go",
    optimality: "O(n log n) time with patience sorting",
    typingFocus: ["binary search insertion", "sort.Search", "slices"],
    code: String.raw`func lengthOfLIS(nums []int) int {
	var tails []int
	for _, n := range nums {
		i := sort.SearchInts(tails, n)
		if i == len(tails) {
			tails = append(tails, n)
		} else {
			tails[i] = n
		}
	}
	return len(tails)
}`,
  },
  {
    id: "go75-partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Determine whether an array can be partitioned into two subsets with equal sums.",
    shikiLang: "go",
    optimality: "O(n * sum) time",
    typingFocus: ["knapsack dp", "boolean arrays", "reverse iteration"],
    code: String.raw`func canPartition(nums []int) bool {
	sum := 0
	for _, n := range nums {
		sum += n
	}
	if sum%2 != 0 {
		return false
	}
	target := sum / 2
	dp := make([]bool, target+1)
	dp[0] = true
	for _, n := range nums {
		for j := target; j >= n; j-- {
			if dp[j-n] {
				dp[j] = true
			}
		}
	}
	return dp[target]
}`,
  },
  {
    id: "go75-unique-paths",
    title: "Unique Paths",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Count the number of unique paths from top-left to bottom-right of a grid moving only right or down.",
    shikiLang: "go",
    optimality: "O(m*n) time, O(n) space",
    typingFocus: ["1D dp row reuse", "nested loops", "slice initialization"],
    code: String.raw`func uniquePaths(m int, n int) int {
	row := make([]int, n)
	for i := range row {
		row[i] = 1
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			row[j] += row[j-1]
		}
	}
	return row[n-1]
}`,
  },
  {
    id: "go75-longest-common-subsequence",
    title: "Longest Common Subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the length of the longest common subsequence between two strings.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["2D dp tables", "nested loops", "string byte comparison"],
    code: String.raw`func longestCommonSubsequence(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}
	return dp[m][n]
}`,
  },
  {
    id: "go75-maximum-subarray",
    title: "Maximum Subarray",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Go",
    category: "dp",
    prompt: "Find the contiguous subarray with the largest sum using Kadane's algorithm.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running sum", "max tracking", "for loops"],
    code: String.raw`func maxSubArray(nums []int) int {
	best, cur := nums[0], nums[0]
	for _, n := range nums[1:] {
		cur = max(n, cur+n)
		if cur > best {
			best = cur
		}
	}
	return best
}`,
  },
  {
    id: "go75-jump-game",
    title: "Jump Game",
    domain: "dsa",
    track: "Greedy",
    language: "Go",
    category: "greedy",
    prompt: "Determine whether it is possible to reach the last index by jumping according to array values.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy reachability", "max tracking", "for loops"],
    code: String.raw`func canJump(nums []int) bool {
	reach := 0
	for i, n := range nums {
		if i > reach {
			return false
		}
		if i+n > reach {
			reach = i + n
		}
	}
	return true
}`,
  },
  {
    id: "go75-gas-station",
    title: "Gas Station",
    domain: "dsa",
    track: "Greedy",
    language: "Go",
    category: "greedy",
    prompt: "Find the starting gas station index from which a complete circular route can be finished.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running totals", "reset logic", "for loops"],
    code: String.raw`func canCompleteCircuit(gas []int, cost []int) int {
	total, tank, start := 0, 0, 0
	for i := 0; i < len(gas); i++ {
		diff := gas[i] - cost[i]
		total += diff
		tank += diff
		if tank < 0 {
			start = i + 1
			tank = 0
		}
	}
	if total < 0 {
		return -1
	}
	return start
}`,
  },
  {
    id: "go75-non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "Go",
    category: "intervals",
    prompt: "Find the minimum number of intervals to remove to make the rest non-overlapping.",
    shikiLang: "go",
    optimality: "O(n log n) time",
    typingFocus: ["sort.Slice", "greedy interval scan", "struct comparisons"],
    code: String.raw`func eraseOverlapIntervals(intervals [][]int) int {
	sort.Slice(intervals, func(i, j int) bool { return intervals[i][1] < intervals[j][1] })
	count := 0
	prevEnd := math.MinInt32
	for _, iv := range intervals {
		if iv[0] >= prevEnd {
			prevEnd = iv[1]
		} else {
			count++
		}
	}
	return count
}`,
  },
  {
    id: "go75-merge-intervals",
    title: "Merge Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "Go",
    category: "intervals",
    prompt: "Merge all overlapping intervals in a list of intervals.",
    shikiLang: "go",
    optimality: "O(n log n) time",
    typingFocus: ["sort.Slice", "slice building", "interval merging"],
    code: String.raw`func merge(intervals [][]int) [][]int {
	sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
	res := [][]int{intervals[0]}
	for _, iv := range intervals[1:] {
		last := res[len(res)-1]
		if iv[0] <= last[1] {
			if iv[1] > last[1] {
				last[1] = iv[1]
			}
		} else {
			res = append(res, iv)
		}
	}
	return res
}`,
  },
  {
    id: "go75-insert-interval",
    title: "Insert Interval",
    domain: "dsa",
    track: "Intervals",
    language: "Go",
    category: "intervals",
    prompt: "Insert a new interval into a sorted list of non-overlapping intervals, merging as needed.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["slice building", "interval merging", "for loops"],
    code: String.raw`func insert(intervals [][]int, newInterval []int) [][]int {
	var res [][]int
	i := 0
	n := len(intervals)
	for i < n && intervals[i][1] < newInterval[0] {
		res = append(res, intervals[i])
		i++
	}
	for i < n && intervals[i][0] <= newInterval[1] {
		if intervals[i][0] < newInterval[0] {
			newInterval[0] = intervals[i][0]
		}
		if intervals[i][1] > newInterval[1] {
			newInterval[1] = intervals[i][1]
		}
		i++
	}
	res = append(res, newInterval)
	for i < n {
		res = append(res, intervals[i])
		i++
	}
	return res
}`,
  },
  {
    id: "go75-meeting-rooms-ii",
    title: "Meeting Rooms II",
    domain: "dsa",
    track: "Intervals",
    language: "Go",
    category: "intervals",
    prompt: "Find the minimum number of meeting rooms required to hold all given meetings.",
    shikiLang: "go",
    optimality: "O(n log n) time",
    typingFocus: ["separate start/end sort", "two pointer merge", "max tracking"],
    code: String.raw`func minMeetingRooms(intervals [][]int) int {
	n := len(intervals)
	starts := make([]int, n)
	ends := make([]int, n)
	for i, iv := range intervals {
		starts[i] = iv[0]
		ends[i] = iv[1]
	}
	sort.Ints(starts)
	sort.Ints(ends)
	rooms, best := 0, 0
	s, e := 0, 0
	for s < n {
		if starts[s] < ends[e] {
			rooms++
			s++
		} else {
			rooms--
			e++
		}
		if rooms > best {
			best = rooms
		}
	}
	return best
}`,
  },
  {
    id: "go75-rotate-image",
    title: "Rotate Image",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Go",
    category: "matrix",
    prompt: "Rotate an n x n matrix 90 degrees clockwise in place.",
    shikiLang: "go",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["matrix transpose", "row reversal", "nested loops"],
    code: String.raw`func rotate(matrix [][]int) {
	n := len(matrix)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}
	for i := 0; i < n; i++ {
		for l, r := 0, n-1; l < r; l, r = l+1, r-1 {
			matrix[i][l], matrix[i][r] = matrix[i][r], matrix[i][l]
		}
	}
}`,
  },
  {
    id: "go75-spiral-matrix",
    title: "Spiral Matrix",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Go",
    category: "matrix",
    prompt: "Return all elements of a matrix in spiral order.",
    shikiLang: "go",
    optimality: "O(m*n) time",
    typingFocus: ["boundary tracking", "for loops", "slice appends"],
    code: String.raw`func spiralOrder(matrix [][]int) []int {
	var res []int
	top, bottom := 0, len(matrix)-1
	left, right := 0, len(matrix[0])-1
	for top <= bottom && left <= right {
		for c := left; c <= right; c++ {
			res = append(res, matrix[top][c])
		}
		top++
		for r := top; r <= bottom; r++ {
			res = append(res, matrix[r][right])
		}
		right--
		if top <= bottom {
			for c := right; c >= left; c-- {
				res = append(res, matrix[bottom][c])
			}
			bottom--
		}
		if left <= right {
			for r := bottom; r >= top; r-- {
				res = append(res, matrix[r][left])
			}
			left++
		}
	}
	return res
}`,
  },
  {
    id: "go75-set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    domain: "dsa",
    track: "Math & Geometry",
    language: "Go",
    category: "matrix",
    prompt: "Set entire rows and columns to zero if any cell in them is zero, using constant extra space.",
    shikiLang: "go",
    optimality: "O(m*n) time, O(1) space",
    typingFocus: ["first row/col as markers", "boolean flags", "nested loops"],
    code: String.raw`func setZeroes(matrix [][]int) {
	rows, cols := len(matrix), len(matrix[0])
	firstRowZero, firstColZero := false, false
	for c := 0; c < cols; c++ {
		if matrix[0][c] == 0 {
			firstRowZero = true
		}
	}
	for r := 0; r < rows; r++ {
		if matrix[r][0] == 0 {
			firstColZero = true
		}
	}
	for r := 1; r < rows; r++ {
		for c := 1; c < cols; c++ {
			if matrix[r][c] == 0 {
				matrix[r][0] = 0
				matrix[0][c] = 0
			}
		}
	}
	for r := 1; r < rows; r++ {
		for c := 1; c < cols; c++ {
			if matrix[r][0] == 0 || matrix[0][c] == 0 {
				matrix[r][c] = 0
			}
		}
	}
	if firstRowZero {
		for c := 0; c < cols; c++ {
			matrix[0][c] = 0
		}
	}
	if firstColZero {
		for r := 0; r < rows; r++ {
			matrix[r][0] = 0
		}
	}
}`,
  },
  {
    id: "go75-sum-of-two-integers",
    title: "Sum of Two Integers",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Go",
    category: "bit-manipulation",
    prompt: "Add two integers without using the plus or minus operators.",
    shikiLang: "go",
    optimality: "O(1) time",
    typingFocus: ["bitwise XOR/AND", "shift operators", "loops"],
    code: String.raw`func getSum(a int, b int) int {
	for b != 0 {
		carry := (a & b) << 1
		a = a ^ b
		b = carry
	}
	return a
}`,
  },
  {
    id: "go75-number-of-1-bits",
    title: "Number of 1 Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Go",
    category: "bit-manipulation",
    prompt: "Count the number of set bits in an unsigned integer.",
    shikiLang: "go",
    optimality: "O(1) time (32 iterations)",
    typingFocus: ["bitwise AND", "right shift", "for loops"],
    code: String.raw`func hammingWeight(num uint32) int {
	count := 0
	for num != 0 {
		count += int(num & 1)
		num >>= 1
	}
	return count
}`,
  },
  {
    id: "go75-counting-bits",
    title: "Counting Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Go",
    category: "bit-manipulation",
    prompt: "For every number from 0 to n, count the number of set bits.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["dp with bit tricks", "slice building", "bitwise shift"],
    code: String.raw`func countBits(n int) []int {
	res := make([]int, n+1)
	for i := 1; i <= n; i++ {
		res[i] = res[i>>1] + (i & 1)
	}
	return res
}`,
  },
  {
    id: "go75-missing-number",
    title: "Missing Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Go",
    category: "bit-manipulation",
    prompt: "Find the missing number in an array containing n distinct numbers from 0 to n.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["XOR accumulation", "for loops", "index arithmetic"],
    code: String.raw`func missingNumber(nums []int) int {
	res := len(nums)
	for i, n := range nums {
		res ^= i ^ n
	}
	return res
}`,
  },
  {
    id: "go75-reverse-bits",
    title: "Reverse Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "Go",
    category: "bit-manipulation",
    prompt: "Reverse the bits of a 32-bit unsigned integer.",
    shikiLang: "go",
    optimality: "O(1) time (32 iterations)",
    typingFocus: ["bitwise shift", "OR accumulation", "for loops"],
    code: String.raw`func reverseBits(num uint32) uint32 {
	var res uint32
	for i := 0; i < 32; i++ {
		res <<= 1
		res |= num & 1
		num >>= 1
	}
	return res
}`,
  },
  {
    id: "go75-valid-anagram",
    title: "Valid Anagram",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "hashing",
    prompt: "Determine whether two strings are anagrams of each other.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["fixed-size arrays", "byte indexing", "conditionals"],
    code: String.raw`func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	var counts [26]int
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
		counts[t[i]-'a']--
	}
	for _, c := range counts {
		if c != 0 {
			return false
		}
	}
	return true
}`,
  },
  {
    id: "go75-permutation-in-string",
    title: "Permutation in String",
    domain: "dsa",
    track: "Sliding Window",
    language: "Go",
    category: "sliding-window",
    prompt: "Determine whether a permutation of one string exists as a substring of another.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["fixed-size arrays", "sliding window", "array equality"],
    code: String.raw`func checkInclusion(s1 string, s2 string) bool {
	if len(s1) > len(s2) {
		return false
	}
	var need, window [26]int
	for i := 0; i < len(s1); i++ {
		need[s1[i]-'a']++
		window[s2[i]-'a']++
	}
	if need == window {
		return true
	}
	for i := len(s1); i < len(s2); i++ {
		window[s2[i]-'a']++
		window[s2[i-len(s1)]-'a']--
		if need == window {
			return true
		}
	}
	return false
}`,
  },
  {
    id: "go75-find-duplicate-number",
    title: "Find the Duplicate Number",
    domain: "dsa",
    track: "Two Pointers",
    language: "Go",
    category: "cycle-detection",
    prompt: "Find the one duplicate number in an array of n+1 integers ranging from 1 to n.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["Floyd's cycle detection", "slow/fast pointers", "for loops"],
    code: String.raw`func findDuplicate(nums []int) int {
	slow, fast := nums[0], nums[nums[0]]
	for slow != fast {
		slow = nums[slow]
		fast = nums[nums[fast]]
	}
	slow2 := 0
	for slow != slow2 {
		slow = nums[slow]
		slow2 = nums[slow2]
	}
	return slow
}`,
  },
  {
    id: "go75-copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Deep copy a linked list where each node also has a random pointer to any node in the list.",
    shikiLang: "go",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["maps for cloned nodes", "struct pointers", "two-pass traversal"],
    code: String.raw`type RandomNode struct {
	Val    int
	Next   *RandomNode
	Random *RandomNode
}

func copyRandomList(head *RandomNode) *RandomNode {
	if head == nil {
		return nil
	}
	clones := make(map[*RandomNode]*RandomNode)
	for cur := head; cur != nil; cur = cur.Next {
		clones[cur] = &RandomNode{Val: cur.Val}
	}
	for cur := head; cur != nil; cur = cur.Next {
		clones[cur].Next = clones[cur.Next]
		clones[cur].Random = clones[cur.Random]
	}
	return clones[head]
}`,
  },
  {
    id: "go75-add-two-numbers",
    title: "Add Two Numbers",
    domain: "dsa",
    track: "Linked List",
    language: "Go",
    category: "linked-list",
    prompt: "Add two numbers represented as linked lists of digits in reverse order.",
    shikiLang: "go",
    optimality: "O(max(n, m)) time",
    typingFocus: ["dummy node pattern", "carry arithmetic", "pointer traversal"],
    code: String.raw`func addTwoNumbers(l1, l2 *ListNode) *ListNode {
	dummy := &ListNode{}
	cur := dummy
	carry := 0
	for l1 != nil || l2 != nil || carry != 0 {
		sum := carry
		if l1 != nil {
			sum += l1.Val
			l1 = l1.Next
		}
		if l2 != nil {
			sum += l2.Val
			l2 = l2.Next
		}
		carry = sum / 10
		cur.Next = &ListNode{Val: sum % 10}
		cur = cur.Next
	}
	return dummy.Next
}`,
  },
  {
    id: "go75-longest-common-prefix",
    title: "Longest Common Prefix",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "strings",
    prompt: "Find the longest common prefix string among an array of strings.",
    shikiLang: "go",
    optimality: "O(n * m) time",
    typingFocus: ["string slicing", "nested loops", "early return"],
    code: String.raw`func longestCommonPrefix(strs []string) string {
	if len(strs) == 0 {
		return ""
	}
	prefix := strs[0]
	for _, s := range strs[1:] {
		i := 0
		for i < len(prefix) && i < len(s) && prefix[i] == s[i] {
			i++
		}
		prefix = prefix[:i]
		if prefix == "" {
			return ""
		}
	}
	return prefix
}`,
  },
  {
    id: "go75-top-k-frequent-words",
    title: "Kth Largest Element in an Array",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Go",
    category: "heap",
    prompt: "Find the kth largest element in an unsorted array.",
    shikiLang: "go",
    optimality: "O(n log k) time",
    typingFocus: ["container/heap interface", "min-heap of size k", "heap.Push/Pop"],
    code: String.raw`func findKthLargest(nums []int, k int) int {
	h := &IntHeap{}
	heap.Init(h)
	for _, n := range nums {
		heap.Push(h, n)
		if h.Len() > k {
			heap.Pop(h)
		}
	}
	return (*h)[0]
}`,
  },
  {
    id: "go75-task-scheduler",
    title: "Task Scheduler",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "Go",
    category: "heap",
    prompt: "Find the minimum number of intervals needed to execute tasks with a cooldown between same tasks.",
    shikiLang: "go",
    optimality: "O(n) time",
    typingFocus: ["frequency counting", "max heap alternative via sort", "greedy math"],
    code: String.raw`func leastInterval(tasks []byte, n int) int {
	var freq [26]int
	for _, t := range tasks {
		freq[t-'A']++
	}
	maxFreq := 0
	for _, f := range freq {
		if f > maxFreq {
			maxFreq = f
		}
	}
	maxCount := 0
	for _, f := range freq {
		if f == maxFreq {
			maxCount++
		}
	}
	res := (maxFreq-1)*(n+1) + maxCount
	if res < len(tasks) {
		return len(tasks)
	}
	return res
}`,
  },
  {
    id: "go75-design-add-search-words",
    title: "Design Add and Search Words Data Structure",
    domain: "dsa",
    track: "Tries",
    language: "Go",
    category: "tries",
    prompt: "Design a data structure supporting word insertion and wildcard search with '.' matching any letter.",
    shikiLang: "go",
    optimality: "O(k) average, O(26^k) worst case for search",
    typingFocus: ["trie with map children", "recursive search", "wildcard handling"],
    code: String.raw`type WordDictionary struct {
	children map[byte]*WordDictionary
	end      bool
}

func newWordDictionary() *WordDictionary {
	return &WordDictionary{children: make(map[byte]*WordDictionary)}
}

func (w *WordDictionary) AddWord(word string) {
	cur := w
	for i := 0; i < len(word); i++ {
		c := word[i]
		if cur.children[c] == nil {
			cur.children[c] = newWordDictionary()
		}
		cur = cur.children[c]
	}
	cur.end = true
}

func (w *WordDictionary) Search(word string) bool {
	var dfs func(node *WordDictionary, i int) bool
	dfs = func(node *WordDictionary, i int) bool {
		if i == len(word) {
			return node.end
		}
		c := word[i]
		if c == '.' {
			for _, child := range node.children {
				if dfs(child, i+1) {
					return true
				}
			}
			return false
		}
		next, ok := node.children[c]
		if !ok {
			return false
		}
		return dfs(next, i+1)
	}
	return dfs(w, 0)
}`,
  },
  {
    id: "go75-rotate-array",
    title: "Rotate Array",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "Go",
    category: "arrays",
    prompt: "Rotate an array to the right by k steps in place.",
    shikiLang: "go",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["in-place reversal", "modulo arithmetic", "helper function"],
    code: String.raw`func rotate(nums []int, k int) {
	n := len(nums)
	k %= n
	reverse := func(l, r int) {
		for l < r {
			nums[l], nums[r] = nums[r], nums[l]
			l++
			r--
		}
	}
	reverse(0, n-1)
	reverse(0, k-1)
	reverse(k, n-1)
}`,
  },
];
