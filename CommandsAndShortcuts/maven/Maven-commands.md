## Skip all the checks
**Question:**  
Can we use `mvn clean install -Pskip-all-checks` to skip all checks in Maven, like Gradle's `-x check`?

---

**Answer:**  
Yes, Deepak — you can define a custom Maven profile named `skip-all-checks` in your `pom.xml` that disables all the common checks. Then you'll be able to run:

```bash
mvn clean install -Pskip-all-checks
```

---

### ✅ Here's how to do it:

Add the following `<profiles>` block at the end of your `pom.xml`:

```xml
<profiles>
  <profile>
    <id>skip-all-checks</id>
    <activation>
      <activeByDefault>false</activeByDefault>
    </activation>
    <properties>
      <!-- Skip tests -->
      <skipTests>true</skipTests>
      <maven.test.skip>true</maven.test.skip>

      <!-- Skip checkstyle -->
      <checkstyle.skip>true</checkstyle.skip>

      <!-- Skip PMD -->
      <pmd.skip>true</pmd.skip>

      <!-- Skip SpotBugs or FindBugs -->
      <spotbugs.skip>true</spotbugs.skip>
      <findbugs.skip>true</findbugs.skip>

      <!-- Skip enforcer -->
      <enforcer.skip>true</enforcer.skip>

      <!-- Skip Javadoc -->
      <maven.javadoc.skip>true</maven.javadoc.skip>
    </properties>
  </profile>
</profiles>
```

---

### 📦 Result:

Now you can run your build like this:

```bash
mvn clean install -Pskip-all-checks
```

This is equivalent to Gradle's:

```bash
./gradlew build -x check
```

---

Let me know if you'd like this profile added to a parent POM or want to apply it conditionally based on environment variables.