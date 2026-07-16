import type { Snippet } from "@/types/snippet";

const BT = "`";
const DL = "$";

export const backendFrameworkSnippets: Snippet[] = [
  // ---- Go ----
  {
    id: "go-http-handler",
    title: "Go HTTP JSON handler",
    domain: "backend",
    track: "REST API",
    language: "Go",
    framework: "net/http",
    category: "server setup",
    prompt: "Write a plain net/http handler that returns JSON.",
    shikiLang: "go",
    typingFocus: ["struct tags", "error handling", "pointer receivers"],
    code: String.raw`type HealthResponse struct {
	Status  string ${BT}json:"status"${BT}
	Service string ${BT}json:"service"${BT}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	resp := HealthResponse{Status: "ok", Service: "ducktype-api"}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}`,
  },
  {
    id: "go-gin-route-group",
    title: "Gin route grouping",
    domain: "backend",
    track: "REST API",
    language: "Go",
    framework: "Gin",
    category: "routing",
    prompt: "Group versioned routes together with Gin.",
    shikiLang: "go",
    typingFocus: ["method chaining", "closures", "route params"],
    code: String.raw`func setupRouter() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		v1.GET("/users", listUsers)
		v1.GET("/users/:id", getUser)
		v1.POST("/users", createUser)
		v1.DELETE("/users/:id", deleteUser)
	}

	return r
}`,
  },
  {
    id: "go-logging-middleware",
    title: "Go logging middleware",
    domain: "backend",
    track: "Middleware",
    language: "Go",
    framework: "net/http",
    category: "middleware",
    prompt: "Wrap a handler with request logging middleware.",
    shikiLang: "go",
    typingFocus: ["function types", "time package", "wrapping handlers"],
    code: String.raw`func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s took %v", r.Method, r.URL.Path, time.Since(start))
	})
}`,
  },
  {
    id: "go-auth-middleware",
    title: "Gin bearer token auth middleware",
    domain: "backend",
    track: "Auth",
    language: "Go",
    framework: "Gin",
    category: "authentication",
    prompt: "Validate a bearer token before allowing a request through.",
    shikiLang: "go",
    typingFocus: ["string splitting", "early return", "context abort"],
    code: String.raw`func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		parts := strings.SplitN(header, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		if !isValidToken(parts[1]) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		c.Next()
	}
}`,
  },
  {
    id: "go-graceful-shutdown",
    title: "Graceful server shutdown",
    domain: "backend",
    track: "Server Lifecycle",
    language: "Go",
    framework: "net/http",
    category: "lifecycle",
    prompt: "Shut down an HTTP server gracefully on interrupt signal.",
    shikiLang: "go",
    typingFocus: ["channels", "select statement", "context with timeout"],
    code: String.raw`func main() {
	srv := &http.Server{Addr: ":8080", Handler: router()}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("forced shutdown: %v", err)
	}
}`,
  },
  {
    id: "go-context-timeout",
    title: "Context timeout for downstream call",
    domain: "backend",
    track: "REST API",
    language: "Go",
    framework: "net/http",
    category: "reliability",
    prompt: "Cancel a downstream request if it takes too long.",
    shikiLang: "go",
    typingFocus: ["defer", "context package", "error wrapping"],
    code: String.raw`func fetchUpstream(ctx context.Context, url string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("build request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}`,
  },
  {
    id: "go-json-bind-validate",
    title: "Bind and validate JSON request body",
    domain: "backend",
    track: "REST API",
    language: "Go",
    framework: "Gin",
    category: "validation",
    prompt: "Bind an incoming JSON body to a struct and validate it.",
    shikiLang: "go",
    typingFocus: ["struct tags", "binding validators", "conditional errors"],
    code: String.raw`type CreateUserRequest struct {
	Name  string ${BT}json:"name" binding:"required"${BT}
	Email string ${BT}json:"email" binding:"required,email"${BT}
	Age   int    ${BT}json:"age" binding:"gte=0,lte=130"${BT}
}

func createUser(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": 1, "name": req.Name})
}`,
  },
  {
    id: "go-in-memory-store",
    title: "In-memory store handler",
    domain: "backend",
    track: "Database",
    language: "Go",
    framework: "chi",
    category: "storage",
    prompt: "Store and retrieve items with a mutex-guarded in-memory map.",
    shikiLang: "go",
    typingFocus: ["mutex locking", "map access", "type assertions"],
    code: String.raw`type Store struct {
	mu    sync.RWMutex
	items map[string]string
}

func (s *Store) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	s.mu.RLock()
	value, ok := s.items[id]
	s.mu.RUnlock()

	if !ok {
		http.NotFound(w, r)
		return
	}
	fmt.Fprint(w, value)
}`,
  },
  {
    id: "go-worker-pool",
    title: "Goroutine worker pool",
    domain: "backend",
    track: "Concurrency",
    language: "Go",
    framework: "net/http",
    category: "background jobs",
    prompt: "Process jobs concurrently with a fixed pool of workers.",
    shikiLang: "go",
    typingFocus: ["channel direction", "waitgroups", "range over channel"],
    code: String.raw`func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for j := range jobs {
		results <- j * j
	}
	_ = id
}

func runPool(jobCount, workerCount int) []int {
	jobs := make(chan int, jobCount)
	results := make(chan int, jobCount)
	var wg sync.WaitGroup

	for w := 1; w <= workerCount; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	for j := 1; j <= jobCount; j++ {
		jobs <- j
	}
	close(jobs)

	wg.Wait()
	close(results)

	out := make([]int, 0, jobCount)
	for r := range results {
		out = append(out, r)
	}
	return out
}`,
  },

  // ---- Java / Spring Boot ----
  {
    id: "spring-rest-controller",
    title: "Spring Boot REST controller",
    domain: "backend",
    track: "REST API",
    language: "Java",
    framework: "Spring Boot",
    category: "server setup",
    prompt: "Expose a GET endpoint that returns a user by id.",
    shikiLang: "java",
    typingFocus: ["annotations", "generics", "constructor injection"],
    code: String.raw`@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}`,
  },
  {
    id: "spring-service-repository",
    title: "Spring service and repository layer",
    domain: "backend",
    track: "Database",
    language: "Java",
    framework: "Spring Boot",
    category: "data access",
    prompt: "Wire a service that reads from a JPA repository.",
    shikiLang: "java",
    typingFocus: ["annotations", "optional chaining", "exception throwing"],
    code: String.raw`@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto findById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(user.getId(), user.getName()))
                .orElseThrow(() -> new UserNotFoundException(id));
    }
}`,
  },
  {
    id: "spring-dto-record-validation",
    title: "Validated DTO record",
    domain: "backend",
    track: "REST API",
    language: "Java",
    framework: "Spring Boot",
    category: "validation",
    prompt: "Define a request DTO as a record with validation annotations.",
    shikiLang: "java",
    typingFocus: ["record syntax", "annotations", "parameter lists"],
    code: String.raw`public record CreateUserRequest(
        @NotBlank(message = "name is required")
        String name,

        @Email(message = "must be a valid email")
        String email,

        @Min(0) @Max(130)
        int age
) {}`,
  },
  {
    id: "spring-exception-handler",
    title: "Global exception handler",
    domain: "backend",
    track: "REST API",
    language: "Java",
    framework: "Spring Boot",
    category: "error handling",
    prompt: "Translate a custom exception into a JSON error response.",
    shikiLang: "java",
    typingFocus: ["annotations", "static factory methods", "http status enum"],
    code: String.raw`@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(UserNotFoundException ex) {
        ErrorResponse body = new ErrorResponse("NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldError().getDefaultMessage();
        return ResponseEntity.badRequest().body(new ErrorResponse("VALIDATION_ERROR", message));
    }
}`,
  },
  {
    id: "spring-jpa-entity",
    title: "JPA entity mapping",
    domain: "backend",
    track: "Database",
    language: "Java",
    framework: "Spring Boot",
    category: "orm",
    prompt: "Map a User entity to its database table with JPA annotations.",
    shikiLang: "java",
    typingFocus: ["annotations", "field declarations", "enum types"],
    code: String.raw`@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    protected User() {}
}`,
  },
  {
    id: "spring-config-properties",
    title: "Config properties class",
    domain: "backend",
    track: "Configuration",
    language: "Java",
    framework: "Spring Boot",
    category: "configuration",
    prompt: "Bind application.yml values to a typed config class.",
    shikiLang: "java",
    typingFocus: ["annotations", "getters and setters", "nested classes"],
    code: String.raw`@Configuration
@ConfigurationProperties(prefix = "ducktype.api")
public class ApiProperties {

    private String baseUrl;
    private int timeoutMs = 5000;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public int getTimeoutMs() {
        return timeoutMs;
    }

    public void setTimeoutMs(int timeoutMs) {
        this.timeoutMs = timeoutMs;
    }
}`,
  },
  {
    id: "spring-request-filter",
    title: "Request logging filter",
    domain: "backend",
    track: "Middleware",
    language: "Java",
    framework: "Spring Boot",
    category: "middleware",
    prompt: "Log every incoming request's method and path with a servlet filter.",
    shikiLang: "java",
    typingFocus: ["interface implementation", "try/finally", "casting"],
    code: String.raw`@Component
public class RequestLoggingFilter implements Filter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        long start = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - start;
            log.info("{} {} took {}ms", httpRequest.getMethod(), httpRequest.getRequestURI(), duration);
        }
    }
}`,
  },

  // ---- Python (FastAPI extra, Django, Flask) ----
  {
    id: "fastapi-dependency-injection",
    title: "FastAPI dependency injection",
    domain: "backend",
    track: "REST API",
    language: "Python",
    framework: "FastAPI",
    category: "dependency injection",
    prompt: "Share a database session across routes using a FastAPI dependency.",
    shikiLang: "python",
    typingFocus: ["type hints", "generator functions", "depends()"],
    code: String.raw`def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user`,
  },
  {
    id: "fastapi-pydantic-model",
    title: "Pydantic request model validation",
    domain: "backend",
    track: "REST API",
    language: "Python",
    framework: "FastAPI",
    category: "validation",
    prompt: "Validate an incoming request body with a Pydantic model.",
    shikiLang: "python",
    typingFocus: ["class definitions", "type annotations", "field validators"],
    code: String.raw`class CreateUserRequest(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    age: int = Field(ge=0, le=130)

    @field_validator("name")
    @classmethod
    def strip_name(cls, value: str) -> str:
        return value.strip()


@app.post("/users", status_code=201)
def create_user(payload: CreateUserRequest):
    return {"id": 1, **payload.model_dump()}`,
  },
  {
    id: "fastapi-background-task",
    title: "FastAPI background task",
    domain: "backend",
    track: "Background Jobs",
    language: "Python",
    framework: "FastAPI",
    category: "background jobs",
    prompt: "Send a welcome email in the background after signup.",
    shikiLang: "python",
    typingFocus: ["function parameters", "async keyword", "dict returns"],
    code: String.raw`def send_welcome_email(email: str) -> None:
    print(f"sending welcome email to {email}")


@app.post("/signup")
async def signup(payload: CreateUserRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_welcome_email, payload.email)
    return {"status": "accepted"}`,
  },
  {
    id: "django-view-urls",
    title: "Django view and URL pattern",
    domain: "backend",
    track: "REST API",
    language: "Python",
    framework: "Django",
    category: "routing",
    prompt: "Write a Django view and hook it up in urls.py.",
    shikiLang: "python",
    typingFocus: ["decorators", "list comprehension", "path function"],
    code: String.raw`# views.py
from django.http import JsonResponse

def user_list(request):
    users = User.objects.values("id", "name", "email")
    return JsonResponse({"users": list(users)})


# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("api/users/", views.user_list, name="user-list"),
]`,
  },
  {
    id: "django-model",
    title: "Django model definition",
    domain: "backend",
    track: "Database",
    language: "Python",
    framework: "Django",
    category: "orm",
    prompt: "Define a Django model for a blog post with a foreign key.",
    shikiLang: "python",
    typingFocus: ["class attributes", "field arguments", "meta class"],
    code: String.raw`class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title`,
  },
  {
    id: "flask-blueprint-route",
    title: "Flask blueprint route",
    domain: "backend",
    track: "REST API",
    language: "Python",
    framework: "Flask",
    category: "routing",
    prompt: "Group user routes into a Flask blueprint.",
    shikiLang: "python",
    typingFocus: ["decorators", "dict literals", "jsonify calls"],
    code: String.raw`users_bp = Blueprint("users", __name__, url_prefix="/api/users")


@users_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({"error": "not found"}), 404
    return jsonify({"id": user.id, "name": user.name})`,
  },

  // ---- Node (Express, NestJS) ----
  {
    id: "express-middleware-chain",
    title: "Express middleware chain",
    domain: "backend",
    track: "Middleware",
    language: "JavaScript",
    framework: "Express",
    category: "middleware",
    prompt: "Chain auth and logging middleware before a route handler.",
    shikiLang: "javascript",
    typingFocus: ["arrow functions", "next callback", "chained middleware"],
    code: String.raw`function requestLogger(req, res, next) {
  console.log(${BT}${DL}{req.method} ${DL}{req.originalUrl}${BT});
  next();
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "missing token" });
  }
  req.userId = verifyToken(token);
  next();
}

app.get("/api/profile", requestLogger, requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});`,
  },
  {
    id: "express-error-handler",
    title: "Express error-handling middleware",
    domain: "backend",
    track: "Middleware",
    language: "JavaScript",
    framework: "Express",
    category: "error handling",
    prompt: "Centralize error responses with a final Express error handler.",
    shikiLang: "javascript",
    typingFocus: ["four-argument functions", "optional chaining", "status codes"],
    code: String.raw`function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  const message = status === 500 ? "internal server error" : err.message;

  console.error(err.stack);
  res.status(status).json({ error: message });
}

app.use(errorHandler);`,
  },
  {
    id: "express-router-module",
    title: "Express router module",
    domain: "backend",
    track: "REST API",
    language: "JavaScript",
    framework: "Express",
    category: "routing",
    prompt: "Define a users router as a separate module and mount it.",
    shikiLang: "javascript",
    typingFocus: ["module exports", "router methods", "template literals"],
    code: String.raw`const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().select("name email");
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "not found" });
  res.json(user);
});

module.exports = router;`,
  },
  {
    id: "nest-controller-service",
    title: "NestJS controller with service DI",
    domain: "backend",
    track: "REST API",
    language: "TypeScript",
    framework: "NestJS",
    category: "server setup",
    prompt: "Inject a service into a NestJS controller for a users resource.",
    shikiLang: "typescript",
    typingFocus: ["decorators", "constructor injection", "type annotations"],
    code: String.raw`@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }
}`,
  },
  {
    id: "nest-injectable-service",
    title: "NestJS injectable service",
    domain: "backend",
    track: "Database",
    language: "TypeScript",
    framework: "NestJS",
    category: "data access",
    prompt: "Write an injectable NestJS service backed by a repository.",
    shikiLang: "typescript",
    typingFocus: ["decorators", "async/await", "exception classes"],
    code: String.raw`@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<UserDto> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(${BT}User ${DL}{id} not found${BT});
    }
    return { id: user.id, name: user.name };
  }
}`,
  },

  // ---- DevOps ----
  {
    id: "docker-go-multistage",
    title: "Multi-stage Go Dockerfile",
    domain: "devops",
    track: "Containers",
    language: "Dockerfile",
    framework: "Docker",
    category: "container setup",
    prompt: "Build a small statically linked Go binary in a multi-stage Dockerfile.",
    shikiLang: "dockerfile",
    typingFocus: ["uppercase commands", "flags", "stage naming"],
    code: String.raw`FROM golang:1.23-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app ./cmd/server

FROM alpine:3.20
RUN adduser -D -u 1000 appuser
COPY --from=builder /app /app
USER appuser
EXPOSE 8080
ENTRYPOINT ["/app"]`,
  },
  {
    id: "docker-python-multistage",
    title: "Multi-stage Python Dockerfile",
    domain: "devops",
    track: "Containers",
    language: "Dockerfile",
    framework: "Docker",
    category: "container setup",
    prompt: "Build a slim Python image that installs dependencies in a separate stage.",
    shikiLang: "dockerfile",
    typingFocus: ["uppercase commands", "paths", "environment variables"],
    code: String.raw`FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
  },
  {
    id: "gha-docker-build-push",
    title: "GitHub Actions Docker build and push",
    domain: "devops",
    track: "CI/CD",
    language: "YAML",
    framework: "GitHub Actions",
    category: "ci/cd",
    prompt: "Build a Docker image and push it to a registry on merge to main.",
    shikiLang: "yaml",
    typingFocus: ["yaml indentation", "list items", "context expressions"],
    code: String.raw`name: build-and-push

on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.REGISTRY_USER }}
          password: \${{ secrets.REGISTRY_TOKEN }}

      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest`,
  },
  {
    id: "gha-matrix-build",
    title: "GitHub Actions matrix build",
    domain: "devops",
    track: "CI/CD",
    language: "YAML",
    framework: "GitHub Actions",
    category: "ci/cd",
    prompt: "Run tests across multiple Node versions using a build matrix.",
    shikiLang: "yaml",
    typingFocus: ["yaml lists", "nested mappings", "expression syntax"],
    code: String.raw`name: test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: "npm"

      - run: npm ci
      - run: npm test`,
  },
  {
    id: "k8s-deployment",
    title: "Kubernetes deployment manifest",
    domain: "devops",
    track: "Orchestration",
    language: "YAML",
    framework: "Kubernetes",
    category: "orchestration",
    prompt: "Define a Kubernetes Deployment with replicas and resource limits.",
    shikiLang: "yaml",
    typingFocus: ["yaml nesting", "key-value pairs", "resource quantities"],
    code: String.raw`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ducktype-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ducktype-api
  template:
    metadata:
      labels:
        app: ducktype-api
    spec:
      containers:
        - name: api
          image: ghcr.io/ducktype/api:latest
          ports:
            - containerPort: 8080
          resources:
            limits:
              cpu: "500m"
              memory: "256Mi"`,
  },
  {
    id: "terraform-s3-bucket",
    title: "Terraform S3 bucket resource",
    domain: "devops",
    track: "Infrastructure",
    language: "HCL",
    framework: "Terraform",
    category: "infrastructure",
    prompt: "Define an S3 bucket resource with versioning enabled.",
    shikiLang: "yaml",
    typingFocus: ["block syntax", "attribute assignment", "nested blocks"],
    code: String.raw`resource "aws_s3_bucket" "assets" {
  bucket = "ducktype-assets"

  tags = {
    Environment = "production"
    Project     = "ducktype"
  }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id

  versioning_configuration {
    status = "Enabled"
  }
}`,
  },
];
