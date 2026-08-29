# Question: How can I configure and use two or multiple databases in Spring Boot?

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
     ├── User Database
     │      ├── DataSource
     │      ├── EntityManagerFactory
     │      └── TransactionManager
     │
     └── Product Database
            ├── DataSource
            ├── EntityManagerFactory
            └── TransactionManager
```

For example:

```text
Spring Boot Application
        |
        ├── UserRepository
        │       |
        │       ↓
        │   User Database
        |
        └── ProductRepository
                |
                ↓
            Product Database
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
# =========================
# User Database
# =========================

app.datasource.user.url=jdbc:mysql://localhost:3306/user_db
app.datasource.user.username=root
app.datasource.user.password=password
app.datasource.user.driver-class-name=com.mysql.cj.jdbc.Driver


# =========================
# Product Database
# =========================

app.datasource.product.url=jdbc:mysql://localhost:3306/product_db
app.datasource.product.username=root
app.datasource.product.password=password
app.datasource.product.driver-class-name=com.mysql.cj.jdbc.Driver
```

---

# 2. Configure the User Database

Create `UserDatabaseConfig.java`:

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

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean userEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {

        return builder
                .dataSource(userDataSource())
                .packages("com.example.app.user.entity")
                .persistenceUnit("user")
                .build();
    }

    @Bean
    @Primary
    public PlatformTransactionManager userTransactionManager(
            EntityManagerFactory userEntityManagerFactory) {

        return new JpaTransactionManager(userEntityManagerFactory);
    }
}
```

## What is happening here?

The configuration creates four important beans:

```text
userDataSourceProperties()
        ↓
userDataSource()
        ↓
userEntityManagerFactory()
        ↓
userTransactionManager()
```

### `userDataSource()`

Creates the connection configuration for the User database.

```java
@Bean
@Primary
public DataSource userDataSource() {
    return userDataSourceProperties()
            .initializeDataSourceBuilder()
            .build();
}
```

### `userEntityManagerFactory()`

Creates the JPA `EntityManagerFactory` for the User database.

```java
@Bean
@Primary
public LocalContainerEntityManagerFactoryBean userEntityManagerFactory(
        EntityManagerFactoryBuilder builder) {

    return builder
            .dataSource(userDataSource())
            .packages("com.example.app.user.entity")
            .persistenceUnit("user")
            .build();
}
```

The important part is:

```java
.dataSource(userDataSource())
```

This tells JPA:

> Use the User database's `DataSource`.

And:

```java
.packages("com.example.app.user.entity")
```

tells JPA:

> These entities belong to this database.

### `userTransactionManager()`

Creates the transaction manager for the User database.

```java
@Bean
@Primary
public PlatformTransactionManager userTransactionManager(
        EntityManagerFactory userEntityManagerFactory) {

    return new JpaTransactionManager(userEntityManagerFactory);
}
```

It uses:

```java
userEntityManagerFactory
```

to manage transactions for the User database.

---

# 3. Configure the Product Database

Create `ProductDatabaseConfig.java`:

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

    @Bean
    public LocalContainerEntityManagerFactoryBean productEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {

        return builder
                .dataSource(productDataSource())
                .packages("com.example.app.product.entity")
                .persistenceUnit("product")
                .build();
    }

    @Bean
    public PlatformTransactionManager productTransactionManager(
            EntityManagerFactory productEntityManagerFactory) {

        return new JpaTransactionManager(productEntityManagerFactory);
    }
}
```

The Product database has the same structure:

```text
productDataSourceProperties()
        ↓
productDataSource()
        ↓
productEntityManagerFactory()
        ↓
productTransactionManager()
```

The important difference is that everything points to the Product database.

---

# 4. How Spring knows which repository uses which database

This is the most important part.

For the User database:

```java
@EnableJpaRepositories(
        basePackages = "com.example.app.user.repository",
        entityManagerFactoryRef = "userEntityManagerFactory",
        transactionManagerRef = "userTransactionManager"
)
```

This tells Spring:

```text
com.example.app.user.repository
             |
             ↓
userEntityManagerFactory
             |
             ↓
userDataSource
             |
             ↓
User Database
```

For the Product database:

```java
@EnableJpaRepositories(
        basePackages = "com.example.app.product.repository",
        entityManagerFactoryRef = "productEntityManagerFactory",
        transactionManagerRef = "productTransactionManager"
)
```

This tells Spring:

```text
com.example.app.product.repository
             |
             ↓
productEntityManagerFactory
             |
             ↓
productDataSource
             |
             ↓
Product Database
```

---

# 5. Why do we need `entityManagerFactoryRef`?

Because we now have **two EntityManagerFactory beans**:

```text
userEntityManagerFactory
productEntityManagerFactory
```

Spring needs to know which one a repository should use.

For example:

```java
entityManagerFactoryRef = "userEntityManagerFactory"
```

means:

> User repositories should use `userEntityManagerFactory`.

Similarly:

```java
entityManagerFactoryRef = "productEntityManagerFactory"
```

means:

> Product repositories should use `productEntityManagerFactory`.

---

# 6. Why do we need `transactionManagerRef`?

For the same reason.

We have two transaction managers:

```text
userTransactionManager
productTransactionManager
```

So:

```java
transactionManagerRef = "userTransactionManager"
```

means:

> Use the User database transaction manager.

And:

```java
transactionManagerRef = "productTransactionManager"
```

means:

> Use the Product database transaction manager.

---

# 7. What happens when we call `userRepository.save()`?

Suppose we have:

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

and:

```java
userRepository.save(user);
```

The flow is:

```text
userRepository.save(user)
        ↓
UserRepository
        ↓
userEntityManagerFactory
        ↓
userDataSource
        ↓
User Database
```

Similarly:

```java
productRepository.save(product);
```

flows through:

```text
productRepository.save(product)
        ↓
ProductRepository
        ↓
productEntityManagerFactory
        ↓
productDataSource
        ↓
Product Database
```

---

# 8. Complete architecture

The complete setup can be remembered like this:

```text
                    Spring Boot Application
                             |
              ┌──────────────┴──────────────┐
              |                             |
        User Repository              Product Repository
              |                             |
              ↓                             ↓
   userEntityManagerFactory      productEntityManagerFactory
              |                             |
              ↓                             ↓
       userDataSource               productDataSource
              |                             |
              ↓                             ↓
        User Database              Product Database
```

And each database has its own transaction manager:

```text
User Database
     |
     └── userTransactionManager


Product Database
     |
     └── productTransactionManager
```

---

# 9. What are these `userEntityManagerFactory` and `userTransactionManager`?

A common confusion is that these look like classes.

They are **not classes**.

They are **Spring bean names**.

For example:

```java
@Bean
public LocalContainerEntityManagerFactoryBean userEntityManagerFactory(...) {
    ...
}
```

The method:

```java
userEntityManagerFactory()
```

creates a Spring bean whose name is:

```text
userEntityManagerFactory
```

Similarly:

```java
@Bean
public PlatformTransactionManager userTransactionManager(...) {
    ...
}
```

creates a bean named:

```text
userTransactionManager
```

That's why we can reference them here:

```java
entityManagerFactoryRef = "userEntityManagerFactory"
```

and:

```java
transactionManagerRef = "userTransactionManager"
```

---

# 10. Why is `@Primary` used?

We have multiple beans of the same type.

For example:

```text
DataSource
    ├── userDataSource
    └── productDataSource
```

and:

```text
EntityManagerFactory
    ├── userEntityManagerFactory
    └── productEntityManagerFactory
```

Spring may not know which one should be the default when something is injected without a qualifier.

Therefore, we mark one database as:

```java
@Primary
```

For example:

```java
@Bean
@Primary
public DataSource userDataSource() {
    ...
}
```

This means:

> If Spring needs a `DataSource` and no specific bean is requested, use `userDataSource`.

`@Primary` does **not** mean that the other database cannot be used. It only establishes the default choice when there is ambiguity.

---

# 11. Even simpler alternative: two databases using JDBC

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

Then you can inject them using `@Qualifier`:

```java
@Autowired
@Qualifier("userDataSource")
private DataSource userDataSource;

@Autowired
@Qualifier("productDataSource")
private DataSource productDataSource;
```

Here you don't need separate `EntityManagerFactory` and JPA `TransactionManager` configurations because you are not using JPA.

---

# 12. The complete mental model

For **multiple databases with Spring Data JPA**, remember:

```text
Multiple Databases
        ↓
Multiple DataSources
        ↓
Multiple EntityManagerFactories
        ↓
Multiple TransactionManagers
        ↓
Separate Repository Packages
        ↓
@EnableJpaRepositories maps them together
```

Or even more simply:

```text
Database
   ↓
DataSource
   ↓
EntityManagerFactory
   ↓
TransactionManager
   ↓
Repository
```

For two databases:

```text
USER DB                         PRODUCT DB
   ↓                               ↓
User DataSource              Product DataSource
   ↓                               ↓
User EMF                      Product EMF
   ↓                               ↓
User TransactionManager      Product TransactionManager
   ↓                               ↓
User Repository              Product Repository
```

---

# 13. Why would we use multiple databases?

Multiple databases are commonly used for:

### CQRS

Separate read and write databases:

```text
                 Application
                     |
              ┌──────┴──────┐
              ↓             ↓
          Write DB       Read DB
              |             |
              └─── Kafka ───┘
```

### Legacy database migration

```text
New Application
      |
      ├── New Database
      |
      └── Legacy Database
```

### Different business domains

```text
Application
    |
    ├── User DB
    ├── Product DB
    └── Order DB
```

### Analytics

```text
Operational DB
       |
       ↓
     Kafka
       |
       ↓
Analytics DB
```

---

# Interview answer

If an interviewer asks:

> **How do you configure multiple databases in Spring Boot?**

A good concise answer is:

> "I configure a separate `DataSource` for each database. Since I'm using Spring Data JPA, I also configure a separate `EntityManagerFactory` and `TransactionManager` for each database. I keep the entities and repositories in separate packages and use `@EnableJpaRepositories` with `entityManagerFactoryRef` and `transactionManagerRef` to map each repository package to the correct database."

The key architecture to remember is:

```text
DataSource
    ↓
EntityManagerFactory
    ↓
TransactionManager
    ↓
Repository
```
