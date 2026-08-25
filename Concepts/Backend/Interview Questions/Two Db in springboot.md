### Question: *How do I have two or multiple databases in Spring Boot?*

Your question is understandable. A more natural version would be:

> **How can I configure and use two or multiple databases in Spring Boot?**

## Simple answer

In Spring Boot, you can connect to multiple databases by creating:

1. **Multiple `DataSource` objects** — one for each database.
2. **Multiple `EntityManagerFactory` objects** — one for each JPA database connection.
3. **Multiple `TransactionManager` objects** — one for each database.
4. Separate **Entity** and **Repository** packages.

---

# The simplest mental model

Suppose you have:

```text
Application
     |
     ├── Primary Database
     │      ├── DataSource
     │      ├── EntityManager
     │      └── TransactionManager
     │
     └── Secondary Database
            ├── DataSource
            ├── EntityManager
            └── TransactionManager
```

For example:

```text
User Service
    |
    +-----> User Database
    |
    +-----> Product Database
```

---

# Project structure

A clean structure could be:

```text
com.example.app
│
├── user
│   ├── entity
│   │   └── User.java
│   └── repository
│       └── UserRepository.java
│
├── product
│   ├── entity
│   │   └── Product.java
│   └── repository
│       └── ProductRepository.java
│
└── config
    ├── UserDatabaseConfig.java
    └── ProductDatabaseConfig.java
```

---

# 1. Configure two databases in `application.properties`

```properties
# Database 1
app.datasource.user.url=jdbc:mysql://localhost:3306/user_db
app.datasource.user.username=root
app.datasource.user.password=password
app.datasource.user.driver-class-name=com.mysql.cj.jdbc.Driver

# Database 2
app.datasource.product.url=jdbc:mysql://localhost:3306/product_db
app.datasource.product.username=root
app.datasource.product.password=password
app.datasource.product.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

# 2. Create the first database configuration

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.example.app.user.repository",
        entityManagerFactoryRef = "userEntityManagerFactory",
        transactionManagerRef = "userTransactionManager"
)
public class UserDatabaseConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "app.datasource.user")
    public DataSourceProperties userDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    public DataSource userDataSource() {
        return userDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }
}
```

---

# 3. Create the second database configuration

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.example.app.product.repository",
        entityManagerFactoryRef = "productEntityManagerFactory",
        transactionManagerRef = "productTransactionManager"
)
public class ProductDatabaseConfig {

    @Bean
    @ConfigurationProperties(prefix = "app.datasource.product")
    public DataSourceProperties productDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource productDataSource() {
        return productDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }
}
```

For a full JPA setup, you would also configure a separate `EntityManagerFactory` and `TransactionManager` for each database.

---

# How Spring knows which database to use

This is the most important part.

You map repositories to databases:

```java
@EnableJpaRepositories(
    basePackages = "com.example.app.user.repository"
)
```

means:

```text
Repositories inside:

com.example.app.user.repository

        ↓

use

        ↓

User Database
```

And:

```java
@EnableJpaRepositories(
    basePackages = "com.example.app.product.repository"
)
```

means:

```text
Repositories inside:

com.example.app.product.repository

        ↓

use

        ↓

Product Database
```

So your application code can look normal:

```java
userRepository.save(user);
```

This automatically goes to:

```text
user_db
```

While:

```java
productRepository.save(product);
```

goes to:

```text
product_db
```

---

# Your screenshot and multiple databases

Your screenshot shows:

```javascript
const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
```

That is unrelated to Spring Boot databases, but the idea of multiple databases is conceptually similar to having multiple separate sources of data.

For example:

```text
React UI
   |
   |
Spring Boot API
   |
   ├── UserRepository
   │        |
   │        ↓
   │     User DB
   |
   └── ProductRepository
            |
            ↓
         Product DB
```

---

# Even simpler alternative: two databases using JDBC

If you don't need JPA, the concept is simpler.

```java
@Bean
@ConfigurationProperties("app.datasource.user")
public DataSource userDataSource() {
    return DataSourceBuilder.create().build();
}

@Bean
@ConfigurationProperties("app.datasource.product")
public DataSource productDataSource() {
    return DataSourceBuilder.create().build();
}
```

Then inject them using `@Qualifier`:

```java
@Autowired
@Qualifier("userDataSource")
private DataSource userDataSource;

@Autowired
@Qualifier("productDataSource")
private DataSource productDataSource;
```

---

# My recommendation for you

Since you are learning Spring Boot with your Java background, remember this architecture:

```text
Multiple Database
       =
Multiple DataSource
       +
Multiple EntityManagerFactory
       +
Multiple TransactionManager
       +
Separate Repository Mapping
```

The **most important concept** is that Spring must know:

> **Which repository belongs to which database.**

That is why `@EnableJpaRepositories` with `basePackages`, `entityManagerFactoryRef`, and `transactionManagerRef` becomes important.

For production systems, this is commonly used for:

* **CQRS** → separate read and write databases.
* **Legacy database + new database** during migration.
* **Multi-tenant applications**.
* Different business domains using separate databases.
* Separate operational and analytics databases.

A useful next step for you would be: **“Show me a complete working Spring Boot example with two MySQL databases, including Entity, Repository, Service, configuration, and transactions.”** That will make the concept much clearer for your architect/system-design learning.
