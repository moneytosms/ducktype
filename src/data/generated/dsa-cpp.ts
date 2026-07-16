import type { Snippet } from "@/types/snippet";

export const dsaCppSnippets: Snippet[] = [
  {
    id: "cpp75-two-sum",
    title: "Two Sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "hashing",
    prompt: "Find the indices of two numbers in an array that add up to a target value.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["unordered_map", "brackets", "return statements"],
    code: String.raw`#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int i = 0; i < (int)nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) {
            return {seen[need], i};
        }
        seen[nums[i]] = i;
    }

    return {};
}`,
  },
  {
    id: "cpp75-contains-duplicate",
    title: "Contains Duplicate",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "hashing",
    prompt: "Determine whether any value appears at least twice in an array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["unordered_set", "range-for loops", "boolean returns"],
    code: String.raw`#include <vector>
#include <unordered_set>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;

    for (int num : nums) {
        if (seen.count(num)) {
            return true;
        }
        seen.insert(num);
    }

    return false;
}`,
  },
  {
    id: "cpp75-product-except-self",
    title: "Product of Array Except Self",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "prefix products",
    prompt: "Build an array where each element is the product of all other elements without using division.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) extra space",
    typingFocus: ["vector initialization", "nested for loops", "index arithmetic"],
    code: String.raw`#include <vector>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);

    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
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
    id: "cpp75-group-anagrams",
    title: "Group Anagrams",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "hashing",
    prompt: "Group a list of strings so that all anagrams of each other end up together.",
    shikiLang: "cpp",
    optimality: "O(n * k log k) time, O(n * k) space",
    typingFocus: ["sort calls", "unordered_map of vectors", "string manipulation"],
    code: String.raw`#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;

    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }

    vector<vector<string>> result;
    for (auto& [key, group] : groups) {
        result.push_back(group);
    }

    return result;
}`,
  },
  {
    id: "cpp75-top-k-frequent",
    title: "Top K Frequent Elements",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "bucket sort",
    prompt: "Return the k most frequently occurring elements in an array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["bucket vectors", "unordered_map counting", "reverse iteration"],
    code: String.raw`#include <vector>
#include <unordered_map>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int num : nums) count[num]++;

    vector<vector<int>> buckets(nums.size() + 1);
    for (auto& [num, freq] : count) {
        buckets[freq].push_back(num);
    }

    vector<int> result;
    for (int freq = buckets.size() - 1; freq >= 0 && (int)result.size() < k; freq--) {
        for (int num : buckets[freq]) {
            result.push_back(num);
            if ((int)result.size() == k) break;
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-encode-decode-strings",
    title: "Encode and Decode Strings",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "string encoding",
    prompt: "Design an algorithm to encode a list of strings into one string and decode it back.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["string concatenation", "to_string conversions", "substr slicing"],
    code: String.raw`#include <vector>
#include <string>
using namespace std;

string encode(vector<string>& strs) {
    string result;
    for (string& s : strs) {
        result += to_string(s.size()) + "#" + s;
    }
    return result;
}

vector<string> decode(string s) {
    vector<string> result;
    int i = 0;

    while (i < (int)s.size()) {
        int j = i;
        while (s[j] != '#') j++;
        int len = stoi(s.substr(i, j - i));
        result.push_back(s.substr(j + 1, len));
        i = j + 1 + len;
    }

    return result;
}`,
  },
  {
    id: "cpp75-longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",
    category: "hashing",
    prompt: "Find the length of the longest run of consecutive integers in an unsorted array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["unordered_set lookups", "while loops", "max tracking"],
    code: String.raw`#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    unordered_set<int> numSet(nums.begin(), nums.end());
    int longest = 0;

    for (int num : numSet) {
        if (numSet.count(num - 1)) continue;

        int length = 1;
        while (numSet.count(num + length)) {
            length++;
        }
        longest = max(longest, length);
    }

    return longest;
}`,
  },
  {
    id: "cpp75-valid-palindrome",
    title: "Valid Palindrome",
    domain: "dsa",
    track: "Two Pointers",
    language: "C++",
    category: "string check",
    prompt: "Check whether a string is a palindrome after ignoring non-alphanumeric characters and case.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer loops", "isalnum calls", "tolower conversions"],
    code: String.raw`#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    int left = 0, right = (int)s.size() - 1;

    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;

        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}`,
  },
  {
    id: "cpp75-two-sum-sorted",
    title: "Two Sum II Sorted Input",
    domain: "dsa",
    track: "Two Pointers",
    language: "C++",
    category: "two pointers",
    prompt: "Find two numbers in a sorted array that add up to a target, returning 1-indexed positions.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer convergence", "conditionals", "index offsets"],
    code: String.raw`#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = (int)numbers.size() - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return {left + 1, right + 1};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return {};
}`,
  },
  {
    id: "cpp75-3sum",
    title: "3Sum",
    domain: "dsa",
    track: "Two Pointers",
    language: "C++",
    category: "two pointers",
    prompt: "Find all unique triplets in an array that sum to zero.",
    shikiLang: "cpp",
    optimality: "O(n^2) time, O(1) extra space",
    typingFocus: ["nested loops", "duplicate skipping", "sort calls"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;

    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1, right = (int)nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                result.push_back({nums[i], nums[left], nums[right]});
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
            }
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-container-most-water",
    title: "Container With Most Water",
    domain: "dsa",
    track: "Two Pointers",
    language: "C++",
    category: "two pointers",
    prompt: "Find two lines that together with the x-axis form the container holding the most water.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["min/max calls", "pointer shrinking", "area calculations"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    int left = 0, right = (int)height.size() - 1;
    int best = 0;

    while (left < right) {
        int area = (right - left) * min(height[left], height[right]);
        best = max(best, area);

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
    id: "cpp75-best-time-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    domain: "dsa",
    track: "Sliding Window",
    language: "C++",
    category: "sliding window",
    prompt: "Find the maximum profit from buying then selling a stock once given daily prices.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["running minimum tracking", "max profit updates", "single pass loops"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int best = 0;

    for (int price : prices) {
        minPrice = min(minPrice, price);
        best = max(best, price - minPrice);
    }

    return best;
}`,
  },
  {
    id: "cpp75-longest-substring-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    domain: "dsa",
    track: "Sliding Window",
    language: "C++",
    category: "sliding window",
    prompt: "Find the length of the longest substring without repeating characters.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(min(n, alphabet)) space",
    typingFocus: ["unordered_map windows", "window pointer updates", "max tracking"],
    code: String.raw`#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int best = 0, start = 0;

    for (int i = 0; i < (int)s.size(); i++) {
        if (lastSeen.count(s[i]) && lastSeen[s[i]] >= start) {
            start = lastSeen[s[i]] + 1;
        }
        lastSeen[s[i]] = i;
        best = max(best, i - start + 1);
    }

    return best;
}`,
  },
  {
    id: "cpp75-longest-repeating-char-replacement",
    title: "Longest Repeating Character Replacement",
    domain: "dsa",
    track: "Sliding Window",
    language: "C++",
    category: "sliding window",
    prompt: "Find the length of the longest substring achievable after replacing at most k characters with any letter.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["fixed-size arrays", "window shrinking", "max frequency tracking"],
    code: String.raw`#include <string>
#include <algorithm>
using namespace std;

int characterReplacement(string s, int k) {
    int count[26] = {0};
    int start = 0, maxCount = 0, best = 0;

    for (int end = 0; end < (int)s.size(); end++) {
        count[s[end] - 'A']++;
        maxCount = max(maxCount, count[s[end] - 'A']);

        while (end - start + 1 - maxCount > k) {
            count[s[start] - 'A']--;
            start++;
        }

        best = max(best, end - start + 1);
    }

    return best;
}`,
  },
  {
    id: "cpp75-minimum-window-substring",
    title: "Minimum Window Substring",
    domain: "dsa",
    track: "Sliding Window",
    language: "C++",
    category: "sliding window",
    prompt: "Find the smallest substring of s that contains every character of t, including duplicates.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(k) space",
    typingFocus: ["unordered_map counters", "window expansion/contraction", "substr extraction"],
    code: String.raw`#include <string>
#include <unordered_map>
using namespace std;

string minWindow(string s, string t) {
    if (t.empty()) return "";

    unordered_map<char, int> need;
    for (char c : t) need[c]++;

    unordered_map<char, int> window;
    int have = 0, required = need.size();
    int bestLen = INT_MAX, bestStart = 0;
    int start = 0;

    for (int end = 0; end < (int)s.size(); end++) {
        char c = s[end];
        window[c]++;
        if (need.count(c) && window[c] == need[c]) have++;

        while (have == required) {
            if (end - start + 1 < bestLen) {
                bestLen = end - start + 1;
                bestStart = start;
            }
            char leftChar = s[start];
            window[leftChar]--;
            if (need.count(leftChar) && window[leftChar] < need[leftChar]) have--;
            start++;
        }
    }

    return bestLen == INT_MAX ? "" : s.substr(bestStart, bestLen);
}`,
  },
  {
    id: "cpp75-valid-parentheses",
    title: "Valid Parentheses",
    domain: "dsa",
    track: "Stack",
    language: "C++",
    category: "stack",
    prompt: "Determine if a string of brackets is properly opened and closed in the right order.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stack push/pop", "switch-like conditionals", "empty checks"],
    code: String.raw`#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> open;
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            open.push(c);
        } else {
            if (open.empty() || open.top() != pairs[c]) return false;
            open.pop();
        }
    }

    return open.empty();
}`,
  },
  {
    id: "cpp75-min-stack",
    title: "Min Stack",
    domain: "dsa",
    track: "Stack",
    language: "C++",
    category: "stack design",
    prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    shikiLang: "cpp",
    optimality: "O(1) time per operation, O(n) space",
    typingFocus: ["class member declarations", "pair stacks", "constructor syntax"],
    code: String.raw`#include <stack>
#include <utility>
using namespace std;

class MinStack {
public:
    void push(int val) {
        int newMin = data.empty() ? val : min(val, data.top().second);
        data.push({val, newMin});
    }

    void pop() {
        data.pop();
    }

    int top() {
        return data.top().first;
    }

    int getMin() {
        return data.top().second;
    }

private:
    stack<pair<int, int>> data;
};`,
  },
  {
    id: "cpp75-generate-parentheses",
    title: "Generate Parentheses",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Generate all combinations of well-formed parentheses for n pairs.",
    shikiLang: "cpp",
    optimality: "O(4^n / sqrt(n)) time, same space",
    typingFocus: ["recursive functions", "string mutation", "backtracking conditions"],
    code: String.raw`#include <vector>
#include <string>
using namespace std;

void backtrack(int open, int close, int n, string& current, vector<string>& result) {
    if ((int)current.size() == 2 * n) {
        result.push_back(current);
        return;
    }

    if (open < n) {
        current.push_back('(');
        backtrack(open + 1, close, n, current, result);
        current.pop_back();
    }
    if (close < open) {
        current.push_back(')');
        backtrack(open, close + 1, n, current, result);
        current.pop_back();
    }
}

vector<string> generateParenthesis(int n) {
    vector<string> result;
    string current;
    backtrack(0, 0, n, current, result);
    return result;
}`,
  },
  {
    id: "cpp75-daily-temperatures",
    title: "Daily Temperatures",
    domain: "dsa",
    track: "Stack",
    language: "C++",
    category: "monotonic stack",
    prompt: "For each day, find how many days until a warmer temperature occurs.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["monotonic stack loops", "index pairs", "while conditions"],
    code: String.raw`#include <vector>
#include <stack>
using namespace std;

vector<int> dailyTemperatures(vector<int>& temperatures) {
    vector<int> result(temperatures.size(), 0);
    stack<int> indices;

    for (int i = 0; i < (int)temperatures.size(); i++) {
        while (!indices.empty() && temperatures[i] > temperatures[indices.top()]) {
            int prevIndex = indices.top();
            indices.pop();
            result[prevIndex] = i - prevIndex;
        }
        indices.push(i);
    }

    return result;
}`,
  },
  {
    id: "cpp75-car-fleet",
    title: "Car Fleet",
    domain: "dsa",
    track: "Stack",
    language: "C++",
    category: "monotonic stack",
    prompt: "Count how many car fleets will arrive at the destination given positions and speeds.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["struct-like pairs", "sorting with lambdas", "stack of times"],
    code: String.raw`#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int carFleet(int target, vector<int>& position, vector<int>& speed) {
    int n = position.size();
    vector<pair<int, double>> cars(n);
    for (int i = 0; i < n; i++) {
        cars[i] = {position[i], (double)(target - position[i]) / speed[i]};
    }
    sort(cars.begin(), cars.end(), greater<>());

    stack<double> fleets;
    for (auto& [pos, time] : cars) {
        if (fleets.empty() || time > fleets.top()) {
            fleets.push(time);
        }
    }

    return fleets.size();
}`,
  },
  {
    id: "cpp75-binary-search",
    title: "Binary Search",
    domain: "dsa",
    track: "Binary Search",
    language: "C++",
    category: "binary search",
    prompt: "Search a sorted array for a target value and return its index or -1.",
    shikiLang: "cpp",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["mid calculations", "while loops", "boundary updates"],
    code: String.raw`#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = (int)nums.size() - 1;

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
    id: "cpp75-search-2d-matrix",
    title: "Search a 2D Matrix",
    domain: "dsa",
    track: "Binary Search",
    language: "C++",
    category: "binary search",
    prompt: "Search a target value in a matrix where rows and columns are sorted, treating it as a flattened array.",
    shikiLang: "cpp",
    optimality: "O(log(m*n)) time, O(1) space",
    typingFocus: ["2D index math", "div/mod arithmetic", "vector of vectors"],
    code: String.raw`#include <vector>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int rows = matrix.size(), cols = matrix[0].size();
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
    id: "cpp75-koko-eating-bananas",
    title: "Koko Eating Bananas",
    domain: "dsa",
    track: "Binary Search",
    language: "C++",
    category: "binary search on answer",
    prompt: "Find the minimum eating speed so Koko can finish all banana piles within h hours.",
    shikiLang: "cpp",
    optimality: "O(n log m) time, O(1) space",
    typingFocus: ["ceiling division", "binary search over answer space", "long accumulation"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

bool canFinish(vector<int>& piles, int speed, int h) {
    long hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;
    }
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int left = 1, right = *max_element(piles.begin(), piles.end());

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, mid, h)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}`,
  },
  {
    id: "cpp75-find-minimum-rotated-sorted",
    title: "Find Minimum in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "C++",
    category: "binary search",
    prompt: "Find the minimum element in a rotated sorted array without duplicates.",
    shikiLang: "cpp",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["rotated array comparisons", "mid pointer logic", "boundary shrinking"],
    code: String.raw`#include <vector>
using namespace std;

int findMin(vector<int>& nums) {
    int left = 0, right = (int)nums.size() - 1;

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
    id: "cpp75-search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    domain: "dsa",
    track: "Binary Search",
    language: "C++",
    category: "binary search",
    prompt: "Search for a target in a rotated sorted array and return its index or -1.",
    shikiLang: "cpp",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["nested conditionals", "sorted-half detection", "mid pointer arithmetic"],
    code: String.raw`#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = (int)nums.size() - 1;

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
    id: "cpp75-reverse-linked-list",
    title: "Reverse Linked List",
    domain: "dsa",
    track: "Linked List",
    language: "C++",
    category: "linked list",
    prompt: "Reverse a singly linked list in place and return the new head.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["pointer swaps", "struct member access", "nullptr checks"],
    code: String.raw`struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}`,
  },
  {
    id: "cpp75-merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    domain: "dsa",
    track: "Linked List",
    language: "C++",
    category: "linked list",
    prompt: "Merge two sorted linked lists into one sorted linked list.",
    shikiLang: "cpp",
    optimality: "O(n + m) time, O(1) extra space",
    typingFocus: ["dummy node pattern", "pointer traversal", "struct arrows"],
    code: String.raw`struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (list1 != nullptr && list2 != nullptr) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }

    tail->next = list1 != nullptr ? list1 : list2;
    return dummy.next;
}`,
  },
  {
    id: "cpp75-reorder-list",
    title: "Reorder List",
    domain: "dsa",
    track: "Linked List",
    language: "C++",
    category: "linked list",
    prompt: "Reorder a linked list so nodes alternate from front and back halves.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["slow/fast pointers", "list splitting", "interleaving loops"],
    code: String.raw`struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

void reorderList(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next != nullptr && fast->next->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode* second = slow->next;
    slow->next = nullptr;
    ListNode* prev = nullptr;
    while (second != nullptr) {
        ListNode* next = second->next;
        second->next = prev;
        prev = second;
        second = next;
    }
    second = prev;

    ListNode* first = head;
    while (second != nullptr) {
        ListNode* tmp1 = first->next;
        ListNode* tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,
  },
  {
    id: "cpp75-remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    domain: "dsa",
    track: "Linked List",
    language: "C++",
    category: "linked list",
    prompt: "Remove the nth node from the end of a linked list in a single pass.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["two pointer gap", "dummy node setup", "pointer deletion"],
    code: String.raw`struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;

    for (int i = 0; i < n; i++) {
        fast = fast->next;
    }

    while (fast->next != nullptr) {
        fast = fast->next;
        slow = slow->next;
    }

    ListNode* toDelete = slow->next;
    slow->next = slow->next->next;
    delete toDelete;

    return dummy.next;
}`,
  },
  {
    id: "cpp75-linked-list-cycle",
    title: "Linked List Cycle",
    domain: "dsa",
    track: "Linked List",
    language: "C++",
    category: "linked list",
    prompt: "Determine whether a linked list contains a cycle.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["fast/slow pointer race", "while loop conditions", "pointer equality checks"],
    code: String.raw`struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }

    return false;
}`,
  },
  {
    id: "cpp75-merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C++",
    category: "heap",
    prompt: "Merge k sorted linked lists into a single sorted linked list.",
    shikiLang: "cpp",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["priority_queue with custom comparators", "lambda comparators", "struct pointers"],
    code: String.raw`#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> heap(cmp);

    for (ListNode* node : lists) {
        if (node != nullptr) heap.push(node);
    }

    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (!heap.empty()) {
        ListNode* node = heap.top();
        heap.pop();
        tail->next = node;
        tail = tail->next;
        if (node->next != nullptr) heap.push(node->next);
    }

    return dummy.next;
}`,
  },
  {
    id: "cpp75-invert-binary-tree",
    title: "Invert Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree recursion",
    prompt: "Swap every left and right child in a binary tree.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive calls", "swap semantics", "struct pointer members"],
    code: String.raw`struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* invertTree(TreeNode* root) {
    if (root == nullptr) return nullptr;

    TreeNode* temp = root->left;
    root->left = invertTree(root->right);
    root->right = invertTree(temp);

    return root;
}`,
  },
  {
    id: "cpp75-max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree recursion",
    prompt: "Compute the maximum depth of a binary tree from root to the farthest leaf.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["recursive max calls", "base case handling", "ternary-free branching"],
    code: String.raw`#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (root == nullptr) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
  },
  {
    id: "cpp75-same-tree",
    title: "Same Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree recursion",
    prompt: "Determine whether two binary trees are structurally identical with the same values.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["boolean recursion", "nullptr comparisons", "logical AND chains"],
    code: String.raw`struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isSameTree(TreeNode* p, TreeNode* q) {
    if (p == nullptr && q == nullptr) return true;
    if (p == nullptr || q == nullptr) return false;
    if (p->val != q->val) return false;

    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
  },
  {
    id: "cpp75-subtree-of-another-tree",
    title: "Subtree of Another Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree recursion",
    prompt: "Determine whether one binary tree is a subtree of another.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m + n) space",
    typingFocus: ["helper function recursion", "recursive OR chains", "nullptr guards"],
    code: String.raw`struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isSameTree(TreeNode* p, TreeNode* q) {
    if (p == nullptr && q == nullptr) return true;
    if (p == nullptr || q == nullptr) return false;
    if (p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}

bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    if (root == nullptr) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}`,
  },
  {
    id: "cpp75-lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "binary search tree",
    prompt: "Find the lowest common ancestor of two nodes in a binary search tree.",
    shikiLang: "cpp",
    optimality: "O(h) time, O(1) space",
    typingFocus: ["BST comparisons", "iterative while loops", "struct pointer chains"],
    code: String.raw`struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* node = root;

    while (node != nullptr) {
        if (p->val < node->val && q->val < node->val) {
            node = node->left;
        } else if (p->val > node->val && q->val > node->val) {
            node = node->right;
        } else {
            return node;
        }
    }

    return nullptr;
}`,
  },
  {
    id: "cpp75-binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "bfs",
    prompt: "Return the values of a binary tree grouped by level using breadth-first traversal.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["queue-based bfs", "level size snapshots", "nested vectors"],
    code: String.raw`#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (root == nullptr) return result;

    queue<TreeNode*> nodes;
    nodes.push(root);

    while (!nodes.empty()) {
        int size = nodes.size();
        vector<int> level;

        for (int i = 0; i < size; i++) {
            TreeNode* node = nodes.front();
            nodes.pop();
            level.push_back(node->val);

            if (node->left != nullptr) nodes.push(node->left);
            if (node->right != nullptr) nodes.push(node->right);
        }

        result.push_back(level);
    }

    return result;
}`,
  },
  {
    id: "cpp75-validate-bst",
    title: "Validate Binary Search Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "binary search tree",
    prompt: "Check whether a binary tree satisfies the binary search tree property.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["long bound parameters", "recursive validity checks", "default argument use"],
    code: String.raw`#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool valid(TreeNode* node, long lower, long upper) {
    if (node == nullptr) return true;
    if (node->val <= lower || node->val >= upper) return false;

    return valid(node->left, lower, node->val) && valid(node->right, node->val, upper);
}

bool isValidBST(TreeNode* root) {
    return valid(root, LONG_MIN, LONG_MAX);
}`,
  },
  {
    id: "cpp75-kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "binary search tree",
    prompt: "Find the kth smallest value in a binary search tree using inorder traversal.",
    shikiLang: "cpp",
    optimality: "O(h + k) time, O(h) space",
    typingFocus: ["stack-based inorder traversal", "counter decrementing", "while-loop pointer chasing"],
    code: String.raw`#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> nodes;
    TreeNode* curr = root;

    while (curr != nullptr || !nodes.empty()) {
        while (curr != nullptr) {
            nodes.push(curr);
            curr = curr->left;
        }
        curr = nodes.top();
        nodes.pop();

        k--;
        if (k == 0) return curr->val;

        curr = curr->right;
    }

    return -1;
}`,
  },
  {
    id: "cpp75-construct-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree construction",
    prompt: "Rebuild a binary tree from its preorder and inorder traversal sequences.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["unordered_map index lookups", "recursive range splitting", "vector slicing indices"],
    code: String.raw`#include <vector>
#include <unordered_map>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* build(vector<int>& preorder, int& preIndex, int inStart, int inEnd,
                 unordered_map<int, int>& inMap) {
    if (inStart > inEnd) return nullptr;

    int rootVal = preorder[preIndex++];
    TreeNode* root = new TreeNode(rootVal);
    int mid = inMap[rootVal];

    root->left = build(preorder, preIndex, inStart, mid - 1, inMap);
    root->right = build(preorder, preIndex, mid + 1, inEnd, inMap);

    return root;
}

TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    unordered_map<int, int> inMap;
    for (int i = 0; i < (int)inorder.size(); i++) inMap[inorder[i]] = i;

    int preIndex = 0;
    return build(preorder, preIndex, 0, inorder.size() - 1, inMap);
}`,
  },
  {
    id: "cpp75-binary-tree-max-path-sum",
    title: "Binary Tree Maximum Path Sum",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree dp",
    prompt: "Find the maximum path sum between any two nodes in a binary tree.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(h) space",
    typingFocus: ["reference parameter updates", "max function chaining", "recursive gain calculation"],
    code: String.raw`#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxGain(TreeNode* node, int& best) {
    if (node == nullptr) return 0;

    int leftGain = max(maxGain(node->left, best), 0);
    int rightGain = max(maxGain(node->right, best), 0);

    best = max(best, node->val + leftGain + rightGain);

    return node->val + max(leftGain, rightGain);
}

int maxPathSum(TreeNode* root) {
    int best = INT_MIN;
    maxGain(root, best);
    return best;
}`,
  },
  {
    id: "cpp75-serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    domain: "dsa",
    track: "Trees",
    language: "C++",
    category: "tree encoding",
    prompt: "Design an algorithm to serialize a binary tree to a string and deserialize it back.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["stringstream usage", "preorder recursion", "sentinel value checks"],
    code: String.raw`#include <string>
#include <sstream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void serializeHelper(TreeNode* node, ostringstream& out) {
    if (node == nullptr) {
        out << "# ";
        return;
    }
    out << node->val << " ";
    serializeHelper(node->left, out);
    serializeHelper(node->right, out);
}

string serialize(TreeNode* root) {
    ostringstream out;
    serializeHelper(root, out);
    return out.str();
}

TreeNode* deserializeHelper(istringstream& in) {
    string val;
    in >> val;
    if (val == "#") return nullptr;

    TreeNode* node = new TreeNode(stoi(val));
    node->left = deserializeHelper(in);
    node->right = deserializeHelper(in);
    return node;
}

TreeNode* deserialize(string data) {
    istringstream in(data);
    return deserializeHelper(in);
}`,
  },
  {
    id: "cpp75-implement-trie",
    title: "Implement Trie",
    domain: "dsa",
    track: "Tries",
    language: "C++",
    category: "trie",
    prompt: "Implement a trie supporting insert, search, and prefix search operations.",
    shikiLang: "cpp",
    optimality: "O(k) time per operation, O(n * k) space",
    typingFocus: ["array of child pointers", "class method definitions", "character index math"],
    code: String.raw`class Trie {
public:
    Trie() {
        for (int i = 0; i < 26; i++) children[i] = nullptr;
        isEnd = false;
    }

    void insert(string word) {
        Trie* node = this;
        for (char c : word) {
            int i = c - 'a';
            if (node->children[i] == nullptr) node->children[i] = new Trie();
            node = node->children[i];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Trie* node = find(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }

private:
    Trie* children[26];
    bool isEnd;

    Trie* find(string word) {
        Trie* node = this;
        for (char c : word) {
            int i = c - 'a';
            if (node->children[i] == nullptr) return nullptr;
            node = node->children[i];
        }
        return node;
    }
};`,
  },
  {
    id: "cpp75-word-search-ii",
    title: "Word Search II",
    domain: "dsa",
    track: "Tries",
    language: "C++",
    category: "trie + backtracking",
    prompt: "Find all words from a dictionary that can be formed by tracing adjacent cells in a board.",
    shikiLang: "cpp",
    optimality: "O(m * n * 4^L) time, O(k) trie space",
    typingFocus: ["nested trie structs", "grid backtracking", "visited marking with sentinels"],
    code: String.raw`#include <vector>
#include <string>
using namespace std;

struct TrieNode {
    TrieNode* children[26] = {};
    string word = "";
};

void addWord(TrieNode* root, const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        int i = c - 'a';
        if (!node->children[i]) node->children[i] = new TrieNode();
        node = node->children[i];
    }
    node->word = word;
}

void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& result) {
    if (r < 0 || c < 0 || r >= (int)board.size() || c >= (int)board[0].size()) return;

    char ch = board[r][c];
    if (ch == '#' || !node->children[ch - 'a']) return;

    node = node->children[ch - 'a'];
    if (!node->word.empty()) {
        result.push_back(node->word);
        node->word = "";
    }

    board[r][c] = '#';
    dfs(board, r + 1, c, node, result);
    dfs(board, r - 1, c, node, result);
    dfs(board, r, c + 1, node, result);
    dfs(board, r, c - 1, node, result);
    board[r][c] = ch;
}

vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    TrieNode* root = new TrieNode();
    for (string& w : words) addWord(root, w);

    vector<string> result;
    for (int r = 0; r < (int)board.size(); r++) {
        for (int c = 0; c < (int)board[0].size(); c++) {
            dfs(board, r, c, root, result);
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-find-median-data-stream",
    title: "Find Median from Data Stream",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C++",
    category: "two heaps",
    prompt: "Design a structure that supports adding numbers and finding the median at any point.",
    shikiLang: "cpp",
    optimality: "O(log n) add, O(1) median, O(n) space",
    typingFocus: ["two priority_queue balancing", "size comparisons", "top() rebalancing"],
    code: String.raw`#include <queue>
#include <vector>
using namespace std;

class MedianFinder {
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();

        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }

private:
    priority_queue<int> maxHeap;
    priority_queue<int, vector<int>, greater<int>> minHeap;
};`,
  },
  {
    id: "cpp75-kth-largest-element",
    title: "Kth Largest Element in an Array",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C++",
    category: "heap",
    prompt: "Find the kth largest element in an unsorted array.",
    shikiLang: "cpp",
    optimality: "O(n log k) time, O(k) space",
    typingFocus: ["min-heap priority_queue", "push/pop pruning", "size-based conditionals"],
    code: String.raw`#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> heap;

    for (int num : nums) {
        heap.push(num);
        if ((int)heap.size() > k) {
            heap.pop();
        }
    }

    return heap.top();
}`,
  },
  {
    id: "cpp75-task-scheduler",
    title: "Task Scheduler",
    domain: "dsa",
    track: "Heap / Priority Queue",
    language: "C++",
    category: "greedy + heap",
    prompt: "Find the minimum number of intervals needed to complete all tasks given a cooldown between same tasks.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["frequency array counting", "max_element calls", "formula-based math"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int leastInterval(vector<char>& tasks, int n) {
    vector<int> count(26, 0);
    for (char t : tasks) count[t - 'A']++;

    int maxFreq = *max_element(count.begin(), count.end());
    int maxCount = 0;
    for (int c : count) {
        if (c == maxFreq) maxCount++;
    }

    int intervals = (maxFreq - 1) * (n + 1) + maxCount;
    return max((int)tasks.size(), intervals);
}`,
  },
  {
    id: "cpp75-subsets",
    title: "Subsets",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Generate all possible subsets of a set of distinct integers.",
    shikiLang: "cpp",
    optimality: "O(n * 2^n) time, O(n) recursion depth",
    typingFocus: ["recursive push/pop", "index-based recursion", "vector of vectors"],
    code: String.raw`#include <vector>
using namespace std;

void backtrack(int start, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);

    for (int i = start; i < (int)nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(i + 1, nums, current, result);
        current.pop_back();
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}`,
  },
  {
    id: "cpp75-combination-sum",
    title: "Combination Sum",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Find all unique combinations of candidates that sum to a target, reusing numbers freely.",
    shikiLang: "cpp",
    optimality: "O(2^t) time worst case, O(t) recursion depth",
    typingFocus: ["recursive sum tracking", "reuse-allowed indexing", "early termination checks"],
    code: String.raw`#include <vector>
using namespace std;

void backtrack(int start, vector<int>& candidates, int remaining,
                vector<int>& current, vector<vector<int>>& result) {
    if (remaining == 0) {
        result.push_back(current);
        return;
    }
    if (remaining < 0) return;

    for (int i = start; i < (int)candidates.size(); i++) {
        current.push_back(candidates[i]);
        backtrack(i, candidates, remaining - candidates[i], current, result);
        current.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(0, candidates, target, current, result);
    return result;
}`,
  },
  {
    id: "cpp75-permutations",
    title: "Permutations",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Generate all possible permutations of a list of distinct integers.",
    shikiLang: "cpp",
    optimality: "O(n * n!) time, O(n) recursion depth",
    typingFocus: ["swap-based recursion", "in-place mutation", "recursive base cases"],
    code: String.raw`#include <vector>
using namespace std;

void backtrack(int start, vector<int>& nums, vector<vector<int>>& result) {
    if (start == (int)nums.size()) {
        result.push_back(nums);
        return;
    }

    for (int i = start; i < (int)nums.size(); i++) {
        swap(nums[start], nums[i]);
        backtrack(start + 1, nums, result);
        swap(nums[start], nums[i]);
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    backtrack(0, nums, result);
    return result;
}`,
  },
  {
    id: "cpp75-subsets-ii",
    title: "Subsets II",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Generate all unique subsets of a set that may contain duplicate values.",
    shikiLang: "cpp",
    optimality: "O(n * 2^n) time, O(n) recursion depth",
    typingFocus: ["duplicate skipping logic", "sort before recursion", "index comparisons"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

void backtrack(int start, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);

    for (int i = start; i < (int)nums.size(); i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        current.push_back(nums[i]);
        backtrack(i + 1, nums, current, result);
        current.pop_back();
    }
}

vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}`,
  },
  {
    id: "cpp75-word-search",
    title: "Word Search",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Determine if a word can be constructed from adjacent letters in a grid without reusing a cell.",
    shikiLang: "cpp",
    optimality: "O(m * n * 4^L) time, O(L) recursion depth",
    typingFocus: ["grid boundary checks", "in-place visited marking", "recursive OR chains"],
    code: String.raw`#include <vector>
#include <string>
using namespace std;

bool dfs(vector<vector<char>>& board, string& word, int r, int c, int idx) {
    if (idx == (int)word.size()) return true;
    if (r < 0 || c < 0 || r >= (int)board.size() || c >= (int)board[0].size()) return false;
    if (board[r][c] != word[idx]) return false;

    char temp = board[r][c];
    board[r][c] = '#';

    bool found = dfs(board, word, r + 1, c, idx + 1) ||
                 dfs(board, word, r - 1, c, idx + 1) ||
                 dfs(board, word, r, c + 1, idx + 1) ||
                 dfs(board, word, r, c - 1, idx + 1);

    board[r][c] = temp;
    return found;
}

bool exist(vector<vector<char>>& board, string word) {
    for (int r = 0; r < (int)board.size(); r++) {
        for (int c = 0; c < (int)board[0].size(); c++) {
            if (dfs(board, word, r, c, 0)) return true;
        }
    }
    return false;
}`,
  },
  {
    id: "cpp75-number-of-islands",
    title: "Number of Islands",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "grid dfs",
    prompt: "Count the number of islands of connected land cells in a grid.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["grid dfs recursion", "boundary guards", "in-place mutation"],
    code: String.raw`#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= (int)grid.size() || c >= (int)grid[0].size()) return;
    if (grid[r][c] != '1') return;

    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;

    for (int r = 0; r < (int)grid.size(); r++) {
        for (int c = 0; c < (int)grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }

    return count;
}`,
  },
  {
    id: "cpp75-clone-graph",
    title: "Clone Graph",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "graph dfs",
    prompt: "Create a deep copy of a connected undirected graph given a reference node.",
    shikiLang: "cpp",
    optimality: "O(V + E) time, O(V) space",
    typingFocus: ["unordered_map of pointers", "recursive graph cloning", "struct with vector members"],
    code: String.raw`#include <vector>
#include <unordered_map>
using namespace std;

class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int _val) : val(_val) {}
};

Node* cloneHelper(Node* node, unordered_map<Node*, Node*>& visited) {
    if (node == nullptr) return nullptr;
    if (visited.count(node)) return visited[node];

    Node* clone = new Node(node->val);
    visited[node] = clone;

    for (Node* neighbor : node->neighbors) {
        clone->neighbors.push_back(cloneHelper(neighbor, visited));
    }

    return clone;
}

Node* cloneGraph(Node* node) {
    unordered_map<Node*, Node*> visited;
    return cloneHelper(node, visited);
}`,
  },
  {
    id: "cpp75-max-area-island",
    title: "Max Area of Island",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "grid dfs",
    prompt: "Find the maximum area of an island of connected land cells in a grid.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["recursive area accumulation", "max tracking", "grid boundary guards"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int dfs(vector<vector<int>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= (int)grid.size() || c >= (int)grid[0].size()) return 0;
    if (grid[r][c] == 0) return 0;

    grid[r][c] = 0;
    return 1 + dfs(grid, r + 1, c) + dfs(grid, r - 1, c) +
               dfs(grid, r, c + 1) + dfs(grid, r, c - 1);
}

int maxAreaOfIsland(vector<vector<int>>& grid) {
    int best = 0;

    for (int r = 0; r < (int)grid.size(); r++) {
        for (int c = 0; c < (int)grid[0].size(); c++) {
            best = max(best, dfs(grid, r, c));
        }
    }

    return best;
}`,
  },
  {
    id: "cpp75-pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "grid dfs",
    prompt: "Find all cells from which water can flow to both the Pacific and Atlantic oceans.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["two boolean grids", "multi-source dfs", "set intersection logic"],
    code: String.raw`#include <vector>
using namespace std;

void dfs(vector<vector<int>>& heights, vector<vector<bool>>& visited, int r, int c, int prevHeight) {
    if (r < 0 || c < 0 || r >= (int)heights.size() || c >= (int)heights[0].size()) return;
    if (visited[r][c] || heights[r][c] < prevHeight) return;

    visited[r][c] = true;
    dfs(heights, visited, r + 1, c, heights[r][c]);
    dfs(heights, visited, r - 1, c, heights[r][c]);
    dfs(heights, visited, r, c + 1, heights[r][c]);
    dfs(heights, visited, r, c - 1, heights[r][c]);
}

vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int rows = heights.size(), cols = heights[0].size();
    vector<vector<bool>> pacific(rows, vector<bool>(cols, false));
    vector<vector<bool>> atlantic(rows, vector<bool>(cols, false));

    for (int r = 0; r < rows; r++) {
        dfs(heights, pacific, r, 0, 0);
        dfs(heights, atlantic, r, cols - 1, 0);
    }
    for (int c = 0; c < cols; c++) {
        dfs(heights, pacific, 0, c, 0);
        dfs(heights, atlantic, rows - 1, c, 0);
    }

    vector<vector<int>> result;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) result.push_back({r, c});
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-surrounded-regions",
    title: "Surrounded Regions",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "grid dfs",
    prompt: "Capture regions of 'O' cells that are not connected to the border of the board.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["border-seeded dfs", "sentinel marking", "double-pass grid rewriting"],
    code: String.raw`#include <vector>
using namespace std;

void dfs(vector<vector<char>>& board, int r, int c) {
    if (r < 0 || c < 0 || r >= (int)board.size() || c >= (int)board[0].size()) return;
    if (board[r][c] != 'O') return;

    board[r][c] = '#';
    dfs(board, r + 1, c);
    dfs(board, r - 1, c);
    dfs(board, r, c + 1);
    dfs(board, r, c - 1);
}

void solve(vector<vector<char>>& board) {
    int rows = board.size(), cols = board[0].size();

    for (int r = 0; r < rows; r++) {
        dfs(board, r, 0);
        dfs(board, r, cols - 1);
    }
    for (int c = 0; c < cols; c++) {
        dfs(board, 0, c);
        dfs(board, rows - 1, c);
    }

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == 'O') board[r][c] = 'X';
            else if (board[r][c] == '#') board[r][c] = 'O';
        }
    }
}`,
  },
  {
    id: "cpp75-rotting-oranges",
    title: "Rotting Oranges",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "multi-source bfs",
    prompt: "Find the minimum minutes until all fresh oranges rot given initially rotten oranges spread each minute.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["multi-source queue seeding", "direction arrays", "level-by-level bfs"],
    code: String.raw`#include <vector>
#include <queue>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int, int>> rotten;
    int fresh = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) rotten.push({r, c});
            else if (grid[r][c] == 1) fresh++;
        }
    }

    int minutes = 0;
    vector<pair<int, int>> dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    while (!rotten.empty() && fresh > 0) {
        int size = rotten.size();
        for (int i = 0; i < size; i++) {
            auto [r, c] = rotten.front();
            rotten.pop();

            for (auto& [dr, dc] : dirs) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    rotten.push({nr, nc});
                }
            }
        }
        minutes++;
    }

    return fresh == 0 ? minutes : -1;
}`,
  },
  {
    id: "cpp75-course-schedule",
    title: "Course Schedule",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "topological sort",
    prompt: "Determine if it is possible to finish all courses given their prerequisite pairs.",
    shikiLang: "cpp",
    optimality: "O(V + E) time, O(V + E) space",
    typingFocus: ["adjacency list build", "in-degree counting", "queue-based topological sort"],
    code: String.raw`#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    vector<int> inDegree(numCourses, 0);

    for (auto& pre : prerequisites) {
        graph[pre[1]].push_back(pre[0]);
        inDegree[pre[0]]++;
    }

    queue<int> ready;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) ready.push(i);
    }

    int completed = 0;
    while (!ready.empty()) {
        int course = ready.front();
        ready.pop();
        completed++;

        for (int next : graph[course]) {
            inDegree[next]--;
            if (inDegree[next] == 0) ready.push(next);
        }
    }

    return completed == numCourses;
}`,
  },
  {
    id: "cpp75-graph-valid-tree",
    title: "Graph Valid Tree",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "union find",
    prompt: "Determine whether a set of edges forms a valid tree over n nodes.",
    shikiLang: "cpp",
    optimality: "O(n * alpha(n)) time, O(n) space",
    typingFocus: ["union-find path compression", "vector-based parent arrays", "edge count checks"],
    code: String.raw`#include <vector>
using namespace std;

int find(vector<int>& parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

bool validTree(int n, vector<vector<int>>& edges) {
    if ((int)edges.size() != n - 1) return false;

    vector<int> parent(n);
    for (int i = 0; i < n; i++) parent[i] = i;

    for (auto& edge : edges) {
        int rootA = find(parent, edge[0]);
        int rootB = find(parent, edge[1]);
        if (rootA == rootB) return false;
        parent[rootA] = rootB;
    }

    return true;
}`,
  },
  {
    id: "cpp75-number-of-connected-components",
    title: "Number of Connected Components in an Undirected Graph",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "union find",
    prompt: "Count the number of connected components in an undirected graph.",
    shikiLang: "cpp",
    optimality: "O(n * alpha(n)) time, O(n) space",
    typingFocus: ["union-find union by find", "component counting", "vector initialization loops"],
    code: String.raw`#include <vector>
using namespace std;

int find(vector<int>& parent, int x) {
    if (parent[x] != x) {
        parent[x] = find(parent, parent[x]);
    }
    return parent[x];
}

int countComponents(int n, vector<vector<int>>& edges) {
    vector<int> parent(n);
    for (int i = 0; i < n; i++) parent[i] = i;

    int components = n;
    for (auto& edge : edges) {
        int rootA = find(parent, edge[0]);
        int rootB = find(parent, edge[1]);
        if (rootA != rootB) {
            parent[rootA] = rootB;
            components--;
        }
    }

    return components;
}`,
  },
  {
    id: "cpp75-alien-dictionary",
    title: "Alien Dictionary",
    domain: "dsa",
    track: "Graphs",
    language: "C++",
    category: "topological sort",
    prompt: "Derive the character order of an alien language from a sorted list of words in that language.",
    shikiLang: "cpp",
    optimality: "O(C) time where C is total character count, O(1) alphabet space",
    typingFocus: ["adjacency set building", "word-pair comparisons", "topological sort with cycle detection"],
    code: String.raw`#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> graph;
    unordered_map<char, int> inDegree;

    for (string& w : words) {
        for (char c : w) inDegree[c] = 0;
    }

    for (int i = 0; i < (int)words.size() - 1; i++) {
        string& first = words[i];
        string& second = words[i + 1];
        int minLen = min(first.size(), second.size());

        if (first.size() > second.size() && first.substr(0, minLen) == second.substr(0, minLen)) {
            return "";
        }

        for (int j = 0; j < minLen; j++) {
            if (first[j] != second[j]) {
                if (!graph[first[j]].count(second[j])) {
                    graph[first[j]].insert(second[j]);
                    inDegree[second[j]]++;
                }
                break;
            }
        }
    }

    queue<char> ready;
    for (auto& [c, deg] : inDegree) {
        if (deg == 0) ready.push(c);
    }

    string result;
    while (!ready.empty()) {
        char c = ready.front();
        ready.pop();
        result += c;

        for (char next : graph[c]) {
            inDegree[next]--;
            if (inDegree[next] == 0) ready.push(next);
        }
    }

    return result.size() == inDegree.size() ? result : "";
}`,
  },
  {
    id: "cpp75-climbing-stairs",
    title: "Climbing Stairs",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Count the number of distinct ways to climb n stairs taking 1 or 2 steps at a time.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling variable swaps", "for-loop accumulation", "fibonacci-style recurrence"],
    code: String.raw`int climbStairs(int n) {
    if (n <= 2) return n;

    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}`,
  },
  {
    id: "cpp75-house-robber",
    title: "House Robber",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Maximize the amount robbed from houses in a row without robbing two adjacent houses.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling max tracking", "max function calls", "single-pass loops"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;

    for (int num : nums) {
        int current = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}`,
  },
  {
    id: "cpp75-house-robber-ii",
    title: "House Robber II",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Maximize robbery amount from houses arranged in a circle without robbing adjacent houses.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["helper function reuse", "subvector construction", "circular case splitting"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int robLine(vector<int>& nums, int start, int end) {
    int prev2 = 0, prev1 = 0;

    for (int i = start; i < end; i++) {
        int current = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];

    return max(robLine(nums, 0, nums.size() - 1), robLine(nums, 1, nums.size()));
}`,
  },
  {
    id: "cpp75-longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "expand around center",
    prompt: "Find the longest palindromic substring within a given string.",
    shikiLang: "cpp",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["expand-around-center loops", "helper function calls", "substring length comparisons"],
    code: String.raw`#include <string>
using namespace std;

string expand(string& s, int left, int right) {
    while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
        left--;
        right++;
    }
    return s.substr(left + 1, right - left - 1);
}

string longestPalindrome(string s) {
    string best = "";

    for (int i = 0; i < (int)s.size(); i++) {
        string odd = expand(s, i, i);
        string even = expand(s, i, i + 1);

        if (odd.size() > best.size()) best = odd;
        if (even.size() > best.size()) best = even;
    }

    return best;
}`,
  },
  {
    id: "cpp75-palindromic-substrings",
    title: "Palindromic Substrings",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "expand around center",
    prompt: "Count how many palindromic substrings exist in a string.",
    shikiLang: "cpp",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["counter increments", "expand loop reuse", "odd/even center handling"],
    code: String.raw`#include <string>
using namespace std;

int expandCount(string& s, int left, int right) {
    int count = 0;
    while (left >= 0 && right < (int)s.size() && s[left] == s[right]) {
        count++;
        left--;
        right++;
    }
    return count;
}

int countSubstrings(string s) {
    int total = 0;

    for (int i = 0; i < (int)s.size(); i++) {
        total += expandCount(s, i, i);
        total += expandCount(s, i, i + 1);
    }

    return total;
}`,
  },
  {
    id: "cpp75-decode-ways",
    title: "Decode Ways",
    domain: "dsa",
    track: "1-D Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Count the number of ways to decode a digit string into letters using A=1 through Z=26.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["rolling dp variables", "substr parsing", "conditional accumulation"],
    code: String.raw`#include <string>
using namespace std;

int numDecodings(string s) {
    if (s.empty() || s[0] == '0') return 0;

    int prev2 = 1, prev1 = 1;

    for (int i = 1; i < (int)s.size(); i++) {
        int current = 0;

        if (s[i] != '0') current += prev1;

        int twoDigit = stoi(s.substr(i - 1, 2));
        if (twoDigit >= 10 && twoDigit <= 26) current += prev2;

        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}`,
  },
  {
    id: "cpp75-coin-change",
    title: "Coin Change",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Find the fewest number of coins needed to make up a given amount.",
    shikiLang: "cpp",
    optimality: "O(amount * coins) time, O(amount) space",
    typingFocus: ["dp array initialization", "nested loop accumulation", "INT_MAX sentinel checks"],
    code: String.raw`#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
  },
  {
    id: "cpp75-maximum-product-subarray",
    title: "Maximum Product Subarray",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Find the contiguous subarray with the largest product within an array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["min/max swap tracking", "negative number handling", "running product updates"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int maxProduct(vector<int>& nums) {
    int result = nums[0];
    int currentMax = nums[0], currentMin = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        int num = nums[i];
        if (num < 0) swap(currentMax, currentMin);

        currentMax = max(num, currentMax * num);
        currentMin = min(num, currentMin * num);

        result = max(result, currentMax);
    }

    return result;
}`,
  },
  {
    id: "cpp75-word-break",
    title: "Word Break",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "dp",
    prompt: "Determine whether a string can be segmented into a space-separated sequence of dictionary words.",
    shikiLang: "cpp",
    optimality: "O(n^2) time, O(n) space",
    typingFocus: ["unordered_set lookups", "nested loop dp", "substr slicing"],
    code: String.raw`#include <string>
#include <vector>
#include <unordered_set>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> words(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;

    for (int i = 1; i <= (int)s.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && words.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.size()];
}`,
  },
  {
    id: "cpp75-longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "binary search dp",
    prompt: "Find the length of the longest strictly increasing subsequence in an array.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["lower_bound usage", "patience sorting logic", "vector replacement"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;

    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if (it == tails.end()) {
            tails.push_back(num);
        } else {
            *it = num;
        }
    }

    return tails.size();
}`,
  },
  {
    id: "cpp75-partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "0/1 knapsack",
    prompt: "Determine whether an array can be partitioned into two subsets with equal sum.",
    shikiLang: "cpp",
    optimality: "O(n * sum) time, O(sum) space",
    typingFocus: ["knapsack bitset-like dp", "reverse iteration", "sum accumulation"],
    code: String.raw`#include <vector>
#include <numeric>
using namespace std;

bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2 != 0) return false;

    int target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;

    for (int num : nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }

    return dp[target];
}`,
  },
  {
    id: "cpp75-unique-paths",
    title: "Unique Paths",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "grid dp",
    prompt: "Count the number of unique paths from top-left to bottom-right of a grid moving only right or down.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(n) space",
    typingFocus: ["1D dp row rolling", "nested loop accumulation", "vector initialization"],
    code: String.raw`#include <vector>
using namespace std;

int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }

    return dp[n - 1];
}`,
  },
  {
    id: "cpp75-longest-common-subsequence",
    title: "Longest Common Subsequence",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "2D dp",
    prompt: "Find the length of the longest common subsequence between two strings.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(m * n) space",
    typingFocus: ["2D vector dp tables", "character comparisons", "nested loop indexing"],
    code: String.raw`#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}`,
  },
  {
    id: "cpp75-maximum-subarray",
    title: "Maximum Subarray",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "C++",
    category: "kadane's algorithm",
    prompt: "Find the contiguous subarray with the largest sum within an array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["kadane accumulation", "max function calls", "single-pass loops"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int best = nums[0];
    int current = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        current = max(nums[i], current + nums[i]);
        best = max(best, current);
    }

    return best;
}`,
  },
  {
    id: "cpp75-jump-game",
    title: "Jump Game",
    domain: "dsa",
    track: "Greedy",
    language: "C++",
    category: "greedy",
    prompt: "Determine whether it's possible to reach the last index given max jump lengths at each position.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["greedy reach tracking", "max function calls", "early break conditions"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

bool canJump(vector<int>& nums) {
    int reach = 0;

    for (int i = 0; i < (int)nums.size(); i++) {
        if (i > reach) return false;
        reach = max(reach, i + nums[i]);
    }

    return true;
}`,
  },
  {
    id: "cpp75-insert-interval",
    title: "Insert Interval",
    domain: "dsa",
    track: "Intervals",
    language: "C++",
    category: "intervals",
    prompt: "Insert a new interval into a sorted, non-overlapping list of intervals and merge as needed.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["vector<vector<int>> merges", "three-phase loop structure", "min/max merging"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push_back(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);

    while (i < n) {
        result.push_back(intervals[i]);
        i++;
    }

    return result;
}`,
  },
  {
    id: "cpp75-merge-intervals",
    title: "Merge Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "C++",
    category: "intervals",
    prompt: "Merge all overlapping intervals in a collection into a minimal set of non-overlapping intervals.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["lambda-based sort", "vector back() access", "overlap merging"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> result;

    for (auto& interval : intervals) {
        if (result.empty() || result.back()[1] < interval[0]) {
            result.push_back(interval);
        } else {
            result.back()[1] = max(result.back()[1], interval[1]);
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    domain: "dsa",
    track: "Intervals",
    language: "C++",
    category: "greedy intervals",
    prompt: "Find the minimum number of intervals to remove so the rest do not overlap.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["lambda comparator sort", "greedy end tracking", "counter increments"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
        return a[1] < b[1];
    });

    int count = 0;
    int prevEnd = intervals[0][1];

    for (int i = 1; i < (int)intervals.size(); i++) {
        if (intervals[i][0] < prevEnd) {
            count++;
        } else {
            prevEnd = intervals[i][1];
        }
    }

    return count;
}`,
  },
  {
    id: "cpp75-meeting-rooms",
    title: "Meeting Rooms",
    domain: "dsa",
    track: "Intervals",
    language: "C++",
    category: "intervals",
    prompt: "Determine whether a person could attend all meetings given their intervals.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(1) extra space",
    typingFocus: ["sort by start time", "consecutive comparisons", "simple boolean returns"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

bool canAttendMeetings(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());

    for (int i = 1; i < (int)intervals.size(); i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }

    return true;
}`,
  },
  {
    id: "cpp75-meeting-rooms-ii",
    title: "Meeting Rooms II",
    domain: "dsa",
    track: "Intervals",
    language: "C++",
    category: "heap intervals",
    prompt: "Find the minimum number of meeting rooms required to hold all given meetings.",
    shikiLang: "cpp",
    optimality: "O(n log n) time, O(n) space",
    typingFocus: ["min-heap of end times", "sort by start", "size-based max tracking"],
    code: String.raw`#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> endTimes;

    for (auto& interval : intervals) {
        if (!endTimes.empty() && endTimes.top() <= interval[0]) {
            endTimes.pop();
        }
        endTimes.push(interval[1]);
    }

    return endTimes.size();
}`,
  },
  {
    id: "cpp75-rotate-image",
    title: "Rotate Image",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C++",
    category: "matrix manipulation",
    prompt: "Rotate an n x n matrix 90 degrees clockwise in place.",
    shikiLang: "cpp",
    optimality: "O(n^2) time, O(1) space",
    typingFocus: ["swap-based transpose", "reverse calls", "nested loop bounds"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }

    for (auto& row : matrix) {
        reverse(row.begin(), row.end());
    }
}`,
  },
  {
    id: "cpp75-spiral-matrix",
    title: "Spiral Matrix",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C++",
    category: "matrix traversal",
    prompt: "Return all elements of a matrix in spiral order.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(1) extra space",
    typingFocus: ["four-boundary tracking", "boundary shrinking", "directional loops"],
    code: String.raw`#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) result.push_back(matrix[top][c]);
        top++;

        for (int r = top; r <= bottom; r++) result.push_back(matrix[r][right]);
        right--;

        if (top <= bottom) {
            for (int c = right; c >= left; c--) result.push_back(matrix[bottom][c]);
            bottom--;
        }

        if (left <= right) {
            for (int r = bottom; r >= top; r--) result.push_back(matrix[r][left]);
            left++;
        }
    }

    return result;
}`,
  },
  {
    id: "cpp75-set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C++",
    category: "matrix manipulation",
    prompt: "Set entire rows and columns to zero if any cell in them is zero, in place.",
    shikiLang: "cpp",
    optimality: "O(m * n) time, O(1) extra space",
    typingFocus: ["first-row/column markers", "boolean sentinel flags", "in-place matrix editing"],
    code: String.raw`#include <vector>
using namespace std;

void setZeroes(vector<vector<int>>& matrix) {
    int rows = matrix.size(), cols = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;

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

    if (firstRowZero) for (int c = 0; c < cols; c++) matrix[0][c] = 0;
    if (firstColZero) for (int r = 0; r < rows; r++) matrix[r][0] = 0;
}`,
  },
  {
    id: "cpp75-happy-number",
    title: "Happy Number",
    domain: "dsa",
    track: "Math & Geometry",
    language: "C++",
    category: "cycle detection",
    prompt: "Determine whether repeatedly summing the squares of a number's digits eventually reaches 1.",
    shikiLang: "cpp",
    optimality: "O(log n) time, O(log n) space",
    typingFocus: ["digit extraction with modulo", "unordered_set cycle detection", "while loop conditions"],
    code: String.raw`#include <unordered_set>
using namespace std;

int nextNumber(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

bool isHappy(int n) {
    unordered_set<int> seen;

    while (n != 1 && !seen.count(n)) {
        seen.insert(n);
        n = nextNumber(n);
    }

    return n == 1;
}`,
  },
  {
    id: "cpp75-single-number",
    title: "Single Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation",
    prompt: "Find the element that appears only once in an array where every other element appears twice.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor accumulation", "single-pass loops", "bitwise operators"],
    code: String.raw`#include <vector>
using namespace std;

int singleNumber(vector<int>& nums) {
    int result = 0;

    for (int num : nums) {
        result ^= num;
    }

    return result;
}`,
  },
  {
    id: "cpp75-number-of-1-bits",
    title: "Number of 1 Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation",
    prompt: "Count the number of set bits in the binary representation of an unsigned integer.",
    shikiLang: "cpp",
    optimality: "O(1) time (32 bit fixed), O(1) space",
    typingFocus: ["bitwise AND/shift", "while loop bit clearing", "brian kernighan's trick"],
    code: String.raw`int hammingWeight(uint32_t n) {
    int count = 0;

    while (n != 0) {
        n &= (n - 1);
        count++;
    }

    return count;
}`,
  },
  {
    id: "cpp75-counting-bits",
    title: "Counting Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation dp",
    prompt: "Return the number of set bits for every number from 0 to n.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["dp with bit tricks", "shift and mask", "vector construction"],
    code: String.raw`#include <vector>
using namespace std;

vector<int> countBits(int n) {
    vector<int> dp(n + 1, 0);

    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }

    return dp;
}`,
  },
  {
    id: "cpp75-reverse-bits",
    title: "Reverse Bits",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation",
    prompt: "Reverse the bits of a given 32-bit unsigned integer.",
    shikiLang: "cpp",
    optimality: "O(1) time (32 fixed iterations), O(1) space",
    typingFocus: ["bit shifting both directions", "fixed iteration loops", "OR accumulation"],
    code: String.raw`uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;

    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }

    return result;
}`,
  },
  {
    id: "cpp75-missing-number",
    title: "Missing Number",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation",
    prompt: "Find the missing number from an array containing n distinct numbers from 0 to n.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["xor cancellation trick", "single loop accumulation", "index vs value comparison"],
    code: String.raw`#include <vector>
using namespace std;

int missingNumber(vector<int>& nums) {
    int result = nums.size();

    for (int i = 0; i < (int)nums.size(); i++) {
        result ^= i ^ nums[i];
    }

    return result;
}`,
  },
  {
    id: "cpp75-sum-of-two-integers",
    title: "Sum of Two Integers",
    domain: "dsa",
    track: "Bit Manipulation",
    language: "C++",
    category: "bit manipulation",
    prompt: "Add two integers without using the plus or minus operators.",
    shikiLang: "cpp",
    optimality: "O(1) time (bounded by bit width), O(1) space",
    typingFocus: ["carry/xor bit tricks", "while loop until no carry", "unsigned casting"],
    code: String.raw`int getSum(int a, int b) {
    while (b != 0) {
        unsigned carry = (unsigned)(a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
  },
  {
    id: "cpp75-reverse-linked-list-ii-detect",
    title: "Find the Duplicate Number",
    domain: "dsa",
    track: "Two Pointers",
    language: "C++",
    category: "cycle detection",
    prompt: "Find the one repeated number in an array of n+1 integers each in the range 1 to n, without modifying the array.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["floyd's cycle detection", "slow/fast pointer indexing", "two-phase loops"],
    code: String.raw`#include <vector>
using namespace std;

int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}`,
  },
  {
    id: "cpp75-word-break-ii",
    title: "Combination Sum II",
    domain: "dsa",
    track: "Backtracking",
    language: "C++",
    category: "backtracking",
    prompt: "Find all unique combinations in a candidate list that sum to a target, using each number at most once.",
    shikiLang: "cpp",
    optimality: "O(2^n) time worst case, O(n) recursion depth",
    typingFocus: ["duplicate skipping in loops", "single-use index advancement", "sorted array backtracking"],
    code: String.raw`#include <vector>
#include <algorithm>
using namespace std;

void backtrack(int start, vector<int>& candidates, int remaining,
                vector<int>& current, vector<vector<int>>& result) {
    if (remaining == 0) {
        result.push_back(current);
        return;
    }

    for (int i = start; i < (int)candidates.size(); i++) {
        if (i > start && candidates[i] == candidates[i - 1]) continue;
        if (candidates[i] > remaining) break;

        current.push_back(candidates[i]);
        backtrack(i + 1, candidates, remaining - candidates[i], current, result);
        current.pop_back();
    }
}

vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> current;
    backtrack(0, candidates, target, current, result);
    return result;
}`,
  },
];
