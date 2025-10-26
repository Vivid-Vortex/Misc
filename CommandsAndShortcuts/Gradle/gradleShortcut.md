#Clean Gradle Cache: Sometimes, Gradle's cache files might cause issues with directory deletion. You can try cleaning #Gradle's cache by running the following command in your project directory:
./gradlew cleanBuildCache

#Refresh Dependencies: Sometimes, Gradle might not fetch the latest dependencies due to caching. You can force Gradle to refresh dependencies #by running the following command in your project directory:
./gradlew --refresh-dependencies

#Clear Gradle Cache: If the issue persists, you can try clearing your Gradle cache to force Gradle to re-download dependencies. You can do this #by deleting the .gradle directory in your user home directory or by running the following command:
./gradlew clean build --refresh-dependencies

#Review Dependency Resolution: Double-check your dependencies and their transitive dependencies to ensure there are no conflicts or #inconsistencies. You can use the dependencyInsight task to inspect the dependency resolution process:
./gradlew dependencyInsight --dependency com.microsoft.azure:azure-storage-queue

#Checking any dependency conflit
Dependency Conflicts: Check for any potential dependency conflicts in your project. Sometimes, conflicts between different dependencies can cause issues with resolution. You can use the dependencyInsight task to inspect the dependency resolution process:

./gradlew dependencyInsight --dependency com.microsoft.azure:azure-storage-queue
./gradlew dependencyInsight --dependency com.microsoft.azure.functions:azure-functions-java-core

#Use Ctrl + f12 to open terminal and then run below command to clean build and skip test while building
./gradlew clean build -x test

#Skip checks, unit tests and Integration tests on Gradle while doing build

```
build -x test -x check -x IntegrationTest
```

---

excluding custom gradle build such as docker-test:

### In below code clean will happen followed by build. In the build it will exclude docker-test:build and thus all the subsequent docker-test checks.

graldle clean build <mark>-x docker-test:build</mark
\*\*\*In this simply by excluding the build part of that check, you can remove all it's subsequent check such as docker-test:check, docker-test:classes etc.
