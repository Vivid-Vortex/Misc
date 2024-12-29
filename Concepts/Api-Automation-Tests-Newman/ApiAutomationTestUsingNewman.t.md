What is Newman automation testing?

	API automation testing using a Postman collection in Java typically involves executing a set of predefined API tests (organized in a Postman collection) programmatically within a Java environment. This can be achieved using Newman, the command-line companion tool for Postman, and integrating it within a Java-based automation framework.

	### Steps to Perform API Automation Testing Using Postman Collection in Java

	1. **Create Postman Collection**:
		 - Develop and organize your API tests in Postman and save them as a collection.
		 - Export the Postman collection (and any environment variables if needed) as JSON files.

	2. **Install Newman**:
		 - Newman is used to run the Postman collections from the command line. Ensure Node.js and npm are installed.
		 - Install Newman globally using npm:
			 ```bash
			 npm install -g newman
			 ```

	3. **Set Up Java Project**:
		 - Create a new Java project using a build tool like Maven or Gradle.
		 - Add dependencies for executing system commands from Java and handling JSON if needed.

	4. **Run Newman from Java**:
		 - Use Java to execute Newman commands, which will run the Postman collection.
		 - Capture and process the results of the Newman execution within your Java code.

	### Example: Running a Postman Collection with Newman in Java

	#### Step 1: Create and Export Postman Collection
	- Export your Postman collection as `collection.json` and your environment variables as `environment.json` (if any).

	#### Step 2: Set Up Maven Project

	Create a new Maven project and add dependencies to your `pom.xml`:

	```xml
	<dependencies>
			<dependency>
					<groupId>org.json</groupId>
					<artifactId>json</artifactId>
					<version>20210307</version>
			</dependency>
	</dependencies>
	```

	#### Step 3: Write Java Code to Run Newman

	```java
	import java.io.BufferedReader;
	import java.io.InputStreamReader;

	public class PostmanTestRunner {

			public static void main(String[] args) {
					try {
							// Command to run Newman with a Postman collection and environment file
							String command = "newman run path/to/collection.json -e path/to/environment.json";

							// Execute the command
							Process process = Runtime.getRuntime().exec(command);

							// Read and print the output of the Newman command
							BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
							String line;
							while ((line = reader.readLine()) != null) {
									System.out.println(line);
							}

							// Wait for the process to complete
							int exitCode = process.waitFor();
							System.out.println("Exited with code: " + exitCode);

							// Handle the exit code as needed
							if (exitCode != 0) {
									throw new RuntimeException("Newman command failed with exit code " + exitCode);
							}
					} catch (Exception e) {
							e.printStackTrace();
					}
			}
	}
	```

	#### Step 4: Integrate into CI/CD
	- Incorporate the Java code into your test suite.
	- Integrate with CI/CD tools like Jenkins, GitLab CI, or others to automate the execution of your API tests.

	### Summary

	API automation testing using a Postman collection in Java involves creating and exporting Postman collections, running these collections using Newman through Java, and processing the results. This approach leverages the powerful API testing capabilities of Postman combined with the flexibility of Java for integrating into larger automation frameworks and CI/CD pipelines.