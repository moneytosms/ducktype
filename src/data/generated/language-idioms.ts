import type { Snippet } from "@/types/snippet";

export const languageIdiomSnippets: Snippet[] = [
  // ---------- C ----------
  {
    id: "c-linked-list-node",
    title: "Linked list node ops",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "data structures",
    prompt: "Define a linked list node and push a new value to the front.",
    shikiLang: "c",
    typingFocus: ["struct pointers", "malloc", "arrow operator"],
    code: String.raw`typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *push_front(Node *head, int value) {
    Node *node = malloc(sizeof(Node));
    if (!node) {
        return head;
    }
    node->value = value;
    node->next = head;
    return node;
}

void free_list(Node *head) {
    while (head) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}`,
  },
  {
    id: "c-string-tokenizer",
    title: "Split string on delimiter",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "strings",
    prompt: "Tokenize a string by a delimiter using strtok.",
    shikiLang: "c",
    typingFocus: ["strtok", "while loops", "printf"],
    code: String.raw`#include <string.h>
#include <stdio.h>

void print_tokens(char *line, const char *delim) {
    char *token = strtok(line, delim);
    while (token != NULL) {
        printf("token: %s\n", token);
        token = strtok(NULL, delim);
    }
}`,
  },
  {
    id: "c-read-lines",
    title: "Read file line by line",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "file io",
    prompt: "Open a file and read it line by line with getline.",
    shikiLang: "c",
    typingFocus: ["FILE pointers", "getline", "null checks"],
    code: String.raw`#include <stdio.h>
#include <stdlib.h>

int read_all_lines(const char *path) {
    FILE *fp = fopen(path, "r");
    if (!fp) {
        perror("fopen");
        return -1;
    }

    char *line = NULL;
    size_t cap = 0;
    ssize_t len;
    while ((len = getline(&line, &cap, fp)) != -1) {
        printf("%s", line);
    }

    free(line);
    fclose(fp);
    return 0;
}`,
  },
  {
    id: "c-dynamic-array",
    title: "Growable array with realloc",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "data structures",
    prompt: "Implement a dynamic array that doubles capacity on growth.",
    shikiLang: "c",
    typingFocus: ["realloc", "struct fields", "capacity doubling"],
    code: String.raw`typedef struct {
    int *data;
    size_t len;
    size_t cap;
} IntArray;

void array_push(IntArray *arr, int value) {
    if (arr->len == arr->cap) {
        size_t new_cap = arr->cap == 0 ? 4 : arr->cap * 2;
        arr->data = realloc(arr->data, new_cap * sizeof(int));
        arr->cap = new_cap;
    }
    arr->data[arr->len++] = value;
}`,
  },
  {
    id: "c-error-code-pattern",
    title: "Error-code return pattern",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "error handling",
    prompt: "Write a function that returns an error code and reports via out-param.",
    shikiLang: "c",
    typingFocus: ["enum", "out parameters", "goto cleanup"],
    code: String.raw`typedef enum {
    OK = 0,
    ERR_INVALID_ARG,
    ERR_OUT_OF_MEMORY
} Status;

Status divide(int a, int b, int *out) {
    if (b == 0) {
        return ERR_INVALID_ARG;
    }
    *out = a / b;
    return OK;
}

int safe_divide(int a, int b) {
    int result = 0;
    Status status = divide(a, b, &result);
    if (status != OK) {
        fprintf(stderr, "error: %d\n", status);
        return -1;
    }
    return result;
}`,
  },
  {
    id: "c-bitmask-flags",
    title: "Bitmask flags",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "bit manipulation",
    prompt: "Define bit flags and toggle/check them with bitwise operators.",
    shikiLang: "c",
    typingFocus: ["bitwise operators", "shift left", "hex literals"],
    code: String.raw`#define FLAG_READ   (1u << 0)
#define FLAG_WRITE  (1u << 1)
#define FLAG_EXEC   (1u << 2)

unsigned set_flag(unsigned flags, unsigned flag) {
    return flags | flag;
}

unsigned clear_flag(unsigned flags, unsigned flag) {
    return flags & ~flag;
}

int has_flag(unsigned flags, unsigned flag) {
    return (flags & flag) != 0;
}`,
  },
  {
    id: "c-qsort-comparator",
    title: "Sort array with qsort",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "sorting",
    prompt: "Sort an array of integers using qsort and a comparator function.",
    shikiLang: "c",
    typingFocus: ["function pointers", "void casts", "qsort"],
    code: String.raw`#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    int lhs = *(const int *)a;
    int rhs = *(const int *)b;
    return (lhs > rhs) - (lhs < rhs);
}

void sort_array(int *arr, size_t count) {
    qsort(arr, count, sizeof(int), compare_ints);
}`,
  },
  {
    id: "c-safe-strncpy",
    title: "Bounded string copy",
    domain: "language",
    track: "C idioms",
    language: "C",
    category: "strings",
    prompt: "Copy a string into a fixed buffer without overflowing it.",
    shikiLang: "c",
    typingFocus: ["strncpy", "null termination", "sizeof buffers"],
    code: String.raw`#include <string.h>

void copy_name(char *dest, size_t dest_size, const char *src) {
    strncpy(dest, src, dest_size - 1);
    dest[dest_size - 1] = '\0';
}

int main(void) {
    char buf[16];
    copy_name(buf, sizeof(buf), "a very long name string");
    return 0;
}`,
  },

  // ---------- C++ ----------
  {
    id: "cpp-unique-ptr-raii",
    title: "RAII with unique_ptr",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "memory management",
    prompt: "Wrap a resource in unique_ptr with a custom deleter.",
    shikiLang: "cpp",
    typingFocus: ["templates", "make_unique", "lambda deleter"],
    code: String.raw`#include <memory>
#include <cstdio>

struct FileCloser {
    void operator()(FILE *fp) const {
        if (fp) fclose(fp);
    }
};

using FilePtr = std::unique_ptr<FILE, FileCloser>;

FilePtr open_file(const char *path) {
    return FilePtr(fopen(path, "r"));
}`,
  },
  {
    id: "cpp-operator-overload",
    title: "Operator overloading",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "operator overloading",
    prompt: "Overload arithmetic and equality operators for a Vector2 struct.",
    shikiLang: "cpp",
    typingFocus: ["operator keyword", "const references", "member initializers"],
    code: String.raw`struct Vector2 {
    double x;
    double y;

    Vector2 operator+(const Vector2 &other) const {
        return Vector2{x + other.x, y + other.y};
    }

    bool operator==(const Vector2 &other) const {
        return x == other.x && y == other.y;
    }
};`,
  },
  {
    id: "cpp-template-function",
    title: "Generic max template",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "templates",
    prompt: "Write a template function that returns the larger of two values.",
    shikiLang: "cpp",
    typingFocus: ["template syntax", "typename", "ternary operator"],
    code: String.raw`template <typename T>
T maximum(const T &a, const T &b) {
    return a > b ? a : b;
}

template <typename T>
T clamp(const T &value, const T &lo, const T &hi) {
    return maximum(lo, minimum(value, hi));
}`,
  },
  {
    id: "cpp-lambda-sort",
    title: "Sort with lambda comparator",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "algorithms",
    prompt: "Sort a vector of structs by a field using std::sort and a lambda.",
    shikiLang: "cpp",
    typingFocus: ["lambda captures", "std::sort", "vector iteration"],
    code: String.raw`#include <algorithm>
#include <vector>
#include <string>

struct Person {
    std::string name;
    int age;
};

void sort_by_age(std::vector<Person> &people) {
    std::sort(people.begin(), people.end(),
              [](const Person &a, const Person &b) {
                  return a.age < b.age;
              });
}`,
  },
  {
    id: "cpp-struct-constructor",
    title: "Struct with constructor",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "structs",
    prompt: "Define a struct with a constructor that validates its arguments.",
    shikiLang: "cpp",
    typingFocus: ["constructor init lists", "throw", "explicit keyword"],
    code: String.raw`#include <stdexcept>

struct Rectangle {
    double width;
    double height;

    explicit Rectangle(double w, double h) : width(w), height(h) {
        if (w <= 0 || h <= 0) {
            throw std::invalid_argument("dimensions must be positive");
        }
    }

    double area() const { return width * height; }
};`,
  },
  {
    id: "cpp-try-catch",
    title: "Exception handling",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "error handling",
    prompt: "Catch a specific exception type and rethrow others.",
    shikiLang: "cpp",
    typingFocus: ["try catch blocks", "catch by reference", "rethrow"],
    code: String.raw`#include <stdexcept>
#include <iostream>

void process(int value) {
    try {
        if (value < 0) {
            throw std::out_of_range("value must be non-negative");
        }
    } catch (const std::out_of_range &e) {
        std::cerr << "caught: " << e.what() << "\n";
    } catch (...) {
        std::cerr << "unknown error\n";
        throw;
    }
}`,
  },
  {
    id: "cpp-optional-usage",
    title: "std::optional lookup",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "optional values",
    prompt: "Return an optional value from a map lookup helper.",
    shikiLang: "cpp",
    typingFocus: ["std::optional", "map find", "value_or"],
    code: String.raw`#include <optional>
#include <unordered_map>
#include <string>

std::optional<int> find_score(const std::unordered_map<std::string, int> &scores,
                               const std::string &key) {
    auto it = scores.find(key);
    if (it == scores.end()) {
        return std::nullopt;
    }
    return it->second;
}

int score_or_default(const std::unordered_map<std::string, int> &scores,
                      const std::string &key) {
    return find_score(scores, key).value_or(0);
}`,
  },
  {
    id: "cpp-range-based-for",
    title: "Range-based for with iterators",
    domain: "language",
    track: "C++ idioms",
    language: "C++",
    category: "iterators",
    prompt: "Iterate a container with a range-based for loop and structured bindings.",
    shikiLang: "cpp",
    typingFocus: ["range-based for", "structured bindings", "auto"],
    code: String.raw`#include <map>
#include <string>
#include <iostream>

void print_ages(const std::map<std::string, int> &ages) {
    for (const auto &[name, age] : ages) {
        std::cout << name << " is " << age << "\n";
    }
}`,
  },

  // ---------- Java ----------
  {
    id: "java-try-with-resources",
    title: "Try-with-resources file read",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "file io",
    prompt: "Read all lines of a file using try-with-resources.",
    shikiLang: "java",
    typingFocus: ["try-with-resources", "checked exceptions", "generics"],
    code: String.raw`import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public List<String> readLines(String path) throws IOException {
    List<String> lines = new ArrayList<>();
    try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
        String line;
        while ((line = reader.readLine()) != null) {
            lines.add(line);
        }
    }
    return lines;
}`,
  },
  {
    id: "java-stream-map-filter",
    title: "Stream map/filter/collect",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "streams",
    prompt: "Filter and transform a list of names using the Stream API.",
    shikiLang: "java",
    typingFocus: ["method chaining", "lambda expressions", "collectors"],
    code: String.raw`import java.util.List;
import java.util.stream.Collectors;

public List<String> shoutLongNames(List<String> names) {
    return names.stream()
            .filter(name -> name.length() > 4)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
}`,
  },
  {
    id: "java-record-type",
    title: "Record type for value objects",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "data classes",
    prompt: "Define a record for an immutable point with a derived method.",
    shikiLang: "java",
    typingFocus: ["record keyword", "compact constructors", "method bodies"],
    code: String.raw`public record Point(double x, double y) {
    public Point {
        if (Double.isNaN(x) || Double.isNaN(y)) {
            throw new IllegalArgumentException("coordinates must be numbers");
        }
    }

    public double distanceTo(Point other) {
        double dx = x - other.x;
        double dy = y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}`,
  },
  {
    id: "java-optional-chain",
    title: "Optional chaining",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "optional values",
    prompt: "Look up a user and safely extract a nested field with Optional.",
    shikiLang: "java",
    typingFocus: ["Optional methods", "method references", "orElse"],
    code: String.raw`import java.util.Map;
import java.util.Optional;

public String getEmailDomain(Map<String, String> emails, String userId) {
    return Optional.ofNullable(emails.get(userId))
            .filter(email -> email.contains("@"))
            .map(email -> email.substring(email.indexOf('@') + 1))
            .orElse("unknown");
}`,
  },
  {
    id: "java-custom-exception",
    title: "Custom checked exception",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "error handling",
    prompt: "Define a custom exception class and throw it on invalid input.",
    shikiLang: "java",
    typingFocus: ["extends Exception", "super calls", "throws clause"],
    code: String.raw`public class InsufficientFundsException extends Exception {
    private final double shortfall;

    public InsufficientFundsException(double shortfall) {
        super("insufficient funds, short by " + shortfall);
        this.shortfall = shortfall;
    }

    public double getShortfall() {
        return shortfall;
    }
}

public void withdraw(double balance, double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException(amount - balance);
    }
}`,
  },
  {
    id: "java-interface-default",
    title: "Interface with default method",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "interfaces",
    prompt: "Define an interface with an abstract method and a default method.",
    shikiLang: "java",
    typingFocus: ["interface keyword", "default methods", "override"],
    code: String.raw`public interface Shape {
    double area();

    default String describe() {
        return "Shape with area " + area();
    }
}

public class Circle implements Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}`,
  },
  {
    id: "java-enum-with-methods",
    title: "Enum with methods",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "enums",
    prompt: "Define an enum with a constructor field and a helper method.",
    shikiLang: "java",
    typingFocus: ["enum constructors", "switch expressions", "final fields"],
    code: String.raw`public enum Direction {
    NORTH(0, 1),
    SOUTH(0, -1),
    EAST(1, 0),
    WEST(-1, 0);

    private final int dx;
    private final int dy;

    Direction(int dx, int dy) {
        this.dx = dx;
        this.dy = dy;
    }

    public Direction opposite() {
        return switch (this) {
            case NORTH -> SOUTH;
            case SOUTH -> NORTH;
            case EAST -> WEST;
            case WEST -> EAST;
        };
    }
}`,
  },
  {
    id: "java-generic-bounded-type",
    title: "Bounded generic method",
    domain: "language",
    track: "Java idioms",
    language: "Java",
    category: "generics",
    prompt: "Write a generic method bounded to Comparable to find the max element.",
    shikiLang: "java",
    typingFocus: ["bounded generics", "extends clause", "for loops"],
    code: String.raw`import java.util.List;

public <T extends Comparable<T>> T findMax(List<T> items) {
    if (items.isEmpty()) {
        throw new IllegalArgumentException("list must not be empty");
    }
    T max = items.get(0);
    for (T item : items) {
        if (item.compareTo(max) > 0) {
            max = item;
        }
    }
    return max;
}`,
  },

  // ---------- Go ----------
  {
    id: "go-error-handling",
    title: "Standard error handling",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "error handling",
    prompt: "Read a config file and propagate errors the Go way.",
    shikiLang: "go",
    typingFocus: ["if err != nil", "fmt.Errorf", "multiple returns"],
    code: String.raw`func loadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("reading config: %w", err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parsing config: %w", err)
    }

    return &cfg, nil
}`,
  },
  {
    id: "go-goroutine-waitgroup",
    title: "Goroutines with WaitGroup",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "concurrency",
    prompt: "Fan out work across goroutines and wait for all to finish.",
    shikiLang: "go",
    typingFocus: ["go keyword", "sync.WaitGroup", "closures"],
    code: String.raw`func processAll(items []string) {
    var wg sync.WaitGroup
    results := make(chan string, len(items))

    for _, item := range items {
        wg.Add(1)
        go func(it string) {
            defer wg.Done()
            results <- strings.ToUpper(it)
        }(item)
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        fmt.Println(r)
    }
}`,
  },
  {
    id: "go-struct-interface",
    title: "Struct implementing an interface",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "interfaces",
    prompt: "Define an interface and a struct method set that satisfies it.",
    shikiLang: "go",
    typingFocus: ["method receivers", "interface types", "struct fields"],
    code: String.raw`type Shape interface {
    Area() float64
    Perimeter() float64
}

type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}`,
  },
  {
    id: "go-defer-panic-recover",
    title: "Defer, panic, recover",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "error handling",
    prompt: "Recover from a panic inside a function using defer.",
    shikiLang: "go",
    typingFocus: ["defer statements", "recover", "named returns"],
    code: String.raw`func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered: %v", r)
        }
    }()

    result = a / b
    return result, nil
}`,
  },
  {
    id: "go-json-struct-tags",
    title: "JSON marshal with struct tags",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "serialization",
    prompt: "Define a struct with JSON tags and marshal it to bytes.",
    shikiLang: "go",
    typingFocus: ["struct tags", "json package", "backtick strings"],
    code: String.raw`type User struct {
    ID    int    `+"`json:\"id\"`"+`
    Name  string `+"`json:\"name\"`"+`
    Email string `+"`json:\"email,omitempty\"`"+`
}

func encodeUser(u User) ([]byte, error) {
    return json.MarshalIndent(u, "", "  ")
}`,
  },
  {
    id: "go-idiom-context-timeout",
    title: "Context with timeout",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "concurrency",
    prompt: "Run an operation with a context timeout and cancel cleanup.",
    shikiLang: "go",
    typingFocus: ["context package", "defer cancel", "select statements"],
    code: String.raw`func fetchWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}`,
  },
  {
    id: "go-slice-manipulation",
    title: "Slice filtering and append",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "slices",
    prompt: "Filter a slice in place and remove an element by index.",
    shikiLang: "go",
    typingFocus: ["slice syntax", "append", "range loops"],
    code: String.raw`func filterEven(nums []int) []int {
    result := nums[:0]
    for _, n := range nums {
        if n%2 == 0 {
            result = append(result, n)
        }
    }
    return result
}

func removeAt(items []string, index int) []string {
    return append(items[:index], items[index+1:]...)
}`,
  },
  {
    id: "go-custom-error-type",
    title: "Custom error with errors.Is",
    domain: "language",
    track: "Go idioms",
    language: "Go",
    category: "error handling",
    prompt: "Define a sentinel error and wrap it so errors.Is still matches.",
    shikiLang: "go",
    typingFocus: ["errors.New", "errors.Is", "wrapped errors"],
    code: String.raw`var ErrNotFound = errors.New("resource not found")

func fetchUser(id int) (*User, error) {
    user, ok := userStore[id]
    if !ok {
        return nil, fmt.Errorf("fetchUser %d: %w", id, ErrNotFound)
    }
    return user, nil
}

func handle(id int) {
    _, err := fetchUser(id)
    if errors.Is(err, ErrNotFound) {
        log.Printf("user %d missing", id)
    }
}`,
  },

  // ---------- Rust ----------
  {
    id: "rust-result-question-mark",
    title: "Result chaining with ?",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "error handling",
    prompt: "Read and parse a file's contents using the ? operator.",
    shikiLang: "rust",
    typingFocus: ["question mark operator", "Result type", "std::fs"],
    code: String.raw`use std::fs;
use std::num::ParseIntError;

fn read_count(path: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let contents = fs::read_to_string(path)?;
    let count: i32 = contents.trim().parse()?;
    Ok(count)
}`,
  },
  {
    id: "rust-struct-impl",
    title: "Struct with impl block",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "structs",
    prompt: "Define a struct with a constructor and instance methods.",
    shikiLang: "rust",
    typingFocus: ["impl blocks", "Self keyword", "method syntax"],
    code: String.raw`struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }

    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn scale(&mut self, factor: f64) {
        self.width *= factor;
        self.height *= factor;
    }
}`,
  },
  {
    id: "rust-trait-generic-fn",
    title: "Trait bound generic function",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "traits",
    prompt: "Define a trait and a generic function constrained by it.",
    shikiLang: "rust",
    typingFocus: ["trait definitions", "generic bounds", "impl Trait"],
    code: String.raw`trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("Article: {}", self.title)
    }
}

fn print_summary<T: Summary>(item: &T) {
    println!("{}", item.summarize());
}`,
  },
  {
    id: "rust-match-patterns",
    title: "Match pattern matching",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "pattern matching",
    prompt: "Match on an enum with data-carrying variants and guards.",
    shikiLang: "rust",
    typingFocus: ["match arms", "enum variants", "match guards"],
    code: String.raw`enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(radius) if *radius > 0.0 => std::f64::consts::PI * radius * radius,
        Shape::Circle(_) => 0.0,
        Shape::Rectangle(w, h) => w * h,
    }
}`,
  },
  {
    id: "rust-iterator-chain",
    title: "Iterator map/filter/collect",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "iterators",
    prompt: "Transform and filter a vector using an iterator chain.",
    shikiLang: "rust",
    typingFocus: ["iterator adapters", "closures", "collect turbofish"],
    code: String.raw`fn even_squares(nums: &[i32]) -> Vec<i32> {
    nums.iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * n)
        .collect::<Vec<i32>>()
}`,
  },
  {
    id: "rust-ownership-borrowing",
    title: "Mutable borrow example",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "ownership",
    prompt: "Pass a mutable reference to a function that modifies a vector in place.",
    shikiLang: "rust",
    typingFocus: ["ampersand mut", "borrow checker", "vec methods"],
    code: String.raw`fn append_greeting(names: &mut Vec<String>, greeting: &str) {
    for name in names.iter_mut() {
        name.push_str(greeting);
    }
}

fn main() {
    let mut names = vec![String::from("Ada"), String::from("Linus")];
    append_greeting(&mut names, "!");
    println!("{:?}", names);
}`,
  },
  {
    id: "rust-hashmap-usage",
    title: "HashMap entry API",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "collections",
    prompt: "Count word frequencies using a HashMap and the entry API.",
    shikiLang: "rust",
    typingFocus: ["HashMap methods", "entry api", "or_insert"],
    code: String.raw`use std::collections::HashMap;

fn word_counts(text: &str) -> HashMap<&str, i32> {
    let mut counts: HashMap<&str, i32> = HashMap::new();
    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }
    counts
}`,
  },
  {
    id: "rust-error-enum",
    title: "Custom error enum",
    domain: "language",
    track: "Rust idioms",
    language: "Rust",
    category: "error handling",
    prompt: "Define a custom error enum with a Display impl.",
    shikiLang: "rust",
    typingFocus: ["enum variants", "Display trait", "match in fmt"],
    code: String.raw`use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    InvalidInput { field: String },
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound(id) => write!(f, "not found: {}", id),
            AppError::InvalidInput { field } => write!(f, "invalid input: {}", field),
        }
    }
}

impl std::error::Error for AppError {}`,
  },

  // ---------- JavaScript ----------
  {
    id: "js-destructuring-spread",
    title: "Destructuring and spread",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "syntax",
    prompt: "Destructure an object with defaults and merge it using spread.",
    shikiLang: "javascript",
    typingFocus: ["destructuring", "spread operator", "default values"],
    code: String.raw`function buildUser({ name, age = 18, ...rest }) {
  return { name, age, ...rest, createdAt: Date.now() };
}

const base = { name: "Ada", role: "admin" };
const user = buildUser({ ...base, age: 30 });`,
  },
  {
    id: "js-async-await-try-catch",
    title: "Async/await with try/catch",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "async",
    prompt: "Fetch JSON data and handle errors with async/await.",
    shikiLang: "javascript",
    typingFocus: ["async/await", "try/catch", "template literals"],
    code: String.raw`async function fetchUser(id) {
  try {
    const response = await fetch(`+"`/api/users/${id}`"+`);
    if (!response.ok) {
      throw new Error(`+"`request failed: ${response.status}`"+`);
    }
    return await response.json();
  } catch (error) {
    console.error("failed to fetch user:", error);
    return null;
  }
}`,
  },
  {
    id: "js-array-map-filter-reduce",
    title: "Array map/filter/reduce chain",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "arrays",
    prompt: "Compute the total price of items in stock using array methods.",
    shikiLang: "javascript",
    typingFocus: ["arrow functions", "method chaining", "reduce accumulator"],
    code: String.raw`const totalInStock = (items) =>
  items
    .filter((item) => item.inStock)
    .map((item) => item.price * item.quantity)
    .reduce((sum, subtotal) => sum + subtotal, 0);`,
  },
  {
    id: "js-closures-currying",
    title: "Closures and currying",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "functional",
    prompt: "Write a curried function that multiplies two numbers.",
    shikiLang: "javascript",
    typingFocus: ["closures", "arrow function chaining", "currying"],
    code: String.raw`const multiply = (a) => (b) => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5), triple(5));`,
  },
  {
    id: "js-class-private-fields",
    title: "Class with private fields",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "classes",
    prompt: "Define a class with a private field and a getter method.",
    shikiLang: "javascript",
    typingFocus: ["private fields", "get accessors", "constructor"],
    code: String.raw`class BankAccount {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("amount must be positive");
    this.#balance += amount;
  }
}`,
  },
  {
    id: "js-map-set-usage",
    title: "Map and Set usage",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "collections",
    prompt: "Deduplicate a list and count occurrences using Map and Set.",
    shikiLang: "javascript",
    typingFocus: ["Map methods", "Set methods", "for-of loops"],
    code: String.raw`function countUnique(items) {
  const unique = new Set(items);
  const counts = new Map();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return { uniqueCount: unique.size, counts };
}`,
  },
  {
    id: "js-debounce-utility",
    title: "Debounce utility function",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "utilities",
    prompt: "Write a debounce function that delays invocation until input settles.",
    shikiLang: "javascript",
    typingFocus: ["closures", "setTimeout", "rest parameters"],
    code: String.raw`function debounce(fn, delayMs) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

const onResize = debounce(() => console.log("resized"), 200);
window.addEventListener("resize", onResize);`,
  },
  {
    id: "js-template-tag-function",
    title: "Tagged template literal",
    domain: "language",
    track: "JavaScript idioms",
    language: "JavaScript",
    category: "strings",
    prompt: "Write a tag function that escapes HTML in interpolated values.",
    shikiLang: "javascript",
    typingFocus: ["tagged templates", "reduce", "escaping"],
    code: String.raw`function escapeHtml(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    const safe = typeof value === "string"
      ? value.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]))
      : value ?? "";
    return result + safe + str;
  });
}

const name = "<script>";
const html = escapeHtml`+"`<div>${name}</div>`"+`;`,
  },
];
