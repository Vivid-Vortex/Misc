in azure logic app, what is the difference between send message and send one or more messages service bus connector?
	Send Message: This action is used to send a single message to a queue or topic in Azure Service Bus. It’s straightforward and is typically used when you have one message that you want to dispatch.
	Send one or more messages: This action allows you to send multiple messages to a queue or topic. You can use this action when you have an array of messages that you want to send in a batch.

What is deployment slot?
	A deployment slot in Azure is a staging environment that enables you to deploy and test your application changes before swapping it with the production environment. It's essentially a separate instance of your application running alongside your production environment. Deployment slots allow you to validate updates, perform testing, and ensure that your application functions correctly in a production-like environment without impacting your live application.

	Deployment slots offer several benefits:

	1. **Testing Environment**: You can deploy your application changes to a deployment slot to perform integration tests, acceptance tests, or other validation tasks before making the changes live.

	2. **Zero Downtime Deployments**: By swapping deployment slots, you can achieve zero-downtime deployments. You can deploy your changes to a staging slot, validate them, and then swap the staging slot with the production slot, effectively redirecting traffic from the old version to the new version without any downtime.

	3. **Rollback Capability**: If you encounter issues with your new deployment, you can quickly swap the deployment slots back, effectively rolling back to the previous version of your application.

	4. **Scale-out Testing**: You can use deployment slots to test the scalability of your application by configuring different scaling settings for each slot.

	Overall, deployment slots provide a robust mechanism for managing the deployment lifecycle of your applications in Azure.

Azure sdk inside Intelij (same sdk is used in VS-Code as well):
Prerequisites:
[Install .Net framework. This is required during function app run as per the logs of AzureFunctionAppEcomDemo or azure-function-examples]
 1. Get the Azure plugin for intelij from the JetBrains site (version of intelij and Azure plugin matters)
 2. Go Settings -> Tools -> Azure
 3. Look for option named, Azure Functions -> Function Core Tools path. Then click on Install the latest version -> follow the direction to install. (You can do this using npm also and just point to the isntalled package which would be inside C:\Users\user_name\AppData\Roaming\npm\node_modules).
 4. Restart the IDE and done.
 5. Login to you azure plugin inside Intelij.
 6. Create a normal springboot function using available dependencies as well as azure plugin.
 (https://github.com/Vivid-Vortex/Cloud/blob/main/Azure/Functions-app/AzureFunctionEcomDemo/build.gradle)
 7. gradle clean (might not work, so manually clean entire build directory in the project classpath of springboot project).
 8. build the project.
 9. Project_name -> src -> Azure - You should have an Azure folder created inside src.
 10. Project_name -> src -> Azure -> Resource Connections - This connection folder should have all the connetions realted data for your function. Think of it as an environment varaiable or a properties file contaning all the connections. All you need to do is to add these connections key (as in usual properties file) or name into your Functions inside .java file.

Azure Storage account poisen-queue:
	When you send a message to an Azure Storage Queue, if the message cannot be processed successfully (due to errors or failures in processing), Azure Storage automatically moves the message to a special queue known as the "poison queue." The poison queue is created by appending "-poison" to the name of the original queue.

	In your case, if you sent a message to the "ecombypocqueue001" queue and it ended up in a queue named "ecombypocqueue001-poison," it means that the original message encountered an issue during processing, and Azure Storage moved it to the poison queue.

	Here are a few common reasons why messages end up in the poison queue:

	Exception during processing: If an exception occurs while processing the message in your Azure Function or application, the message may be moved to the poison queue.

	Message expiration: If the time-to-live (TTL) for the message expires before it is processed, the message may be moved to the poison queue.

	Max delivery count exceeded: Azure Storage Queues have a maximum delivery count for each message. If the message exceeds this count without being successfully processed, it is moved to the poison queue.

	To address messages ending up in the poison queue, you should:

	Review your code to ensure proper error handling and exception management.
	Check for any configuration issues that might be causing messages to fail processing.
	Monitor the poison queue regularly to identify recurring issues and improve the reliability of your message processing logic.
	
	Go to edit configuration -> (+)Add new configuration (in the top left corner of edit configuraiton) -> run functions/deploy to functions. You can simply run the function app using gree arrow button next to your function name annotation in java file where your fu nction resides. 
	
	Very Important - After you tested your function app locally and then deployed to azure functiona app remotely on azure. "Do not forget to start and stop your function app again. Becuase of the cache you might not see the output correctly. So always restart after the deployment."
-----------------------------------------------------------------------------------------------------------
CLI command Centere:-

	az vm create \
	--resource-group cwgassets-rg \
	--name cookingsrv \
	--image UbuntuLTS \
	--generate-ssh-keys \
	--admin-username azureuser \
output: Below output will tell us where the generated keys are stored.
SSH key files ' /home/amy/ .ssh/id_rsa' and
' /home/amy/ .ssh/id_rsa.pub' have been generated under —/ .ssh to
allow SSH access to the VM. If using machines without permanent
storage, back up your keys to a safe location.


-----------------------------------------------------------------------------------------------------------
Code can be deployed through either CLI or Powershell  (both are declerative code style) OR through imperative style with the use of ARM Template (only for Azure) or Bicep (only for Azure) or Terraform (use HCL language).



-----------------------------------------------------------------------------------------------------------
Azure App service:-
Azure App Service is a fully managed platform-as-a-service (PaaS) offering from Microsoft Azure that allows developers to build, deploy, and scale web applications and APIs quickly and easily. It provides a rich set of features and tools for building various types of applications, including web apps, mobile backends, RESTful APIs, and serverless functions.

Key features of Azure App Service include:
	- Built-in DevOps Integration: Azure App Service seamlessly integrates with Azure DevOps, GitHub, and other popular development  and CI/CD tools, enabling continuous integration and deployment workflows.
	- Automatic Scaling: App Service automatically scales up or down based on demand, ensuring optimal performance and cost  efficiency. It supports both manual and automatic scaling options.
	- High Availability: Azure App Service offers built-in load balancing, redundancy, and automatic OS and runtime patches to ensure high availability and reliability of applications.
	- Deployment Slots: Deployment slots allow users to deploy different versions of an application to separate environments (e.g., staging, production) without downtime, enabling easy testing and rollback.
	- Managed Runtimes: App Service supports multiple programming languages and frameworks, including .NET, Java, Node.js, Python, and PHP. It also offers managed runtimes for popular frameworks like .NET Core and Node.js, with automatic updates and patching.
	- Integrated Security: Azure App Service provides various security features, including built-in authentication and authorization, SSL/TLS encryption, role-based access control (RBAC), and Web Application Firewall (WAF) protection.
	- Monitoring and Diagnostics: App Service offers built-in monitoring and diagnostics tools, including application performance monitoring (APM), log streaming, and integration with Azure Monitor for real-time monitoring and troubleshooting.
	- Integration with Azure Services: App Service seamlessly integrates with other Azure services like Azure SQL Database, Azure Cosmos DB, Azure Functions, Azure Active Directory (Azure AD), and more, enabling developers to leverage the full capabilities of the Azure ecosystem.

Overall, Azure App Service simplifies the process of building, deploying, and managing web applications and APIs in the cloud, allowing developers to focus on writing code and delivering value to their users.
-----------------------------------------------------------------------------------------------------------
3. Azure Container Registry (Docker Hub) & Azure Container Instance (Actual docker container or running image instances)
Run Containers by Using Azure Container Instances
	In this lab, you will get some practice with both Azure Container Instances and Azure Container Registry. First, you’ll jump into Azure Cloud Shell to create an Azure Container Registry. Then, you will add a simple Docker container image to the registry. Once the container image is pushed to the registry, you will move to the Azure portal to run an instance of the container in Azure Container Instances. To be successful completing the lab on your own, you should be familiar with the Azure portal and Azure CLI, but anyone with an interest in learning more about these two services for containerized code can use the lab guide and solution videos to work through the objectives successfully.

Solution:
	Create ACR using command line:-
		1. Go to cloudsheel -> start your cloud shell instance and select bash.
		2. az group list #To get the names of resouce group.
		3. rg=774—c7f4cac9—run—containers—by—us
		4. name=acrlabdemo
		5. acr="$name$RANDOM"
		6. az acr create ——resource—group $rg ——name $acr ——sku Basic
		7. az acr update —n $acr ——admin—enabled true
	
		1. cd clouddrive
		2. echo FROM mcr.microsoft.com/hello—world > Dockerfile
		3. az acr build ——image sample/ hello—world: vl ——registry $acr ——file Dockerfile .
		4. Go to your resource group overview page where you created all the above resoruces.
		5. Refresh it and you'll see it listed first is storage accoutn and second is container registry.
		6. go to the listed registry.
		7. navigate to repositories section under services.
		8. you'll see your newly created repository.
	
	Create and run the container instance (ACI), but this time using portal.
		1. Navigate to your resource group.
		2. click on create
		3. In the get started page serach for "container instances".
		4. create & fill in all the details.
		5. Under image source -> you must selct Azure Container Registry
		6. Review and create.
		7. Once it's deployed. Go to overview page and click on start.
		8. Navigate to Contianers under settings section -> Click on Logs tab
		9. If no erros and message working correctly and you're good to go.
		
4. Azure App servcie -
Stage a .NET Web App Using App Service Deployment Slots and Azure CLI
		The Azure App Service includes deployment slots to help improve the way in which updates to your code can be deployed to production.

		In this hands-on lab, we'll use the Azure CLI within the Cloud Shell, in order to deploy a basic .NET web application to a staging slot. We'll then use the Azure portal to promote the staging slot to production.
		Cloud Shell includes the Azure CLI and the .NET CLI, which we will use to perform all tasks.
		Scenario You've recently been employed as a cloud developer for a company that uses Azure App Service. A web application has been deployed by a previous cloud consultant, but no one you work with is familiar with Azure.
		After a recent change to the production web app caused an outage, your manager has asked whether you could recommend any improvements to the code deployment processes.
		You have suggested the use of App Service deployment slots.
		Before implementing this change, you must demonstrate the functionality to your manager. In order to perform this proof of concept, you will need to:

			- Deploy a simple .NET Core web application to a new web app in Azure App Service.
			- Make changes to your web application, and deploy these to a staging slot.
			- Perform a slot swap, so that your changes are promoted to production.
		
		LEARNING OBJECTIVES
			- Set Up Cloud Shell
			- Set Up a .NET Web App in Azure App Service
			- Update Your App and Upload to a Staging Slot
			- Swap Staging and Production Slots
Solution:
		
		1. dotnet new webapp —o webapp
		2. cd webapp/
		3. az webapp up —n webapp12388ajjd —g 626—b2b95284—stage—a—net—web—app—using—app—servic ——sku sl --Ioction "Central US" #There's some update on this command. check for this.
		4. If the above command fails for the first time, try it for 2 to 3 times. It happens as per the demo.
		5. Go to resource group section on the portal. And the you will see the app name "webapp12388ajjd", the name which we gave in step 1.
		6. Click on that resource name and on the overview page, click on the URL.
		7. You'll see your output. 
		
		Deployment slot demo:-
		1. code Pages/Index.cshtml #html code changes on cli itself just for demo. You can choose another way.
		2. az webapp deployment slot create —n webapp12388ajjd —g 626—b2b95284—stage—a—net—web—app—using—app—servic ——slot staging
		3. dotnet publish —o build2
		4. cd build2
		5. zip —r build. zip .
		6. az webapp deployment source config—zip —n webapp12388ajjd —g 626—b2b95284—stage—a—net—web—app—using—app—servic ——src build. zip ——slot staging
		7. Now go to "webapp12388ajjd", which was created in the above-above step 6.
		8. Go to deployment slots. you'll see two deployment slots (green "production") and other staging tag.
		9. Here you can choose to observe and change the the traffic percentage for both the new deployment and the old one, say 50:50 and then gradully you can swap completly if everything works fine.
		10. Go to CLI once again.
		11. az webapp deployment slot swap —n webapp12388ajjd —g 626—b2b95284—stage—a—net—web—app—using—pp—servic ——slot staging ——target—slot productionl
		12. Go ahead with the URL of the webapp and test your application.

5. Deploy and Run Your First Azure Function
ABOUT THIS LAB
Azure Functions is at the core of Azure's serverless services and is great at building simple APIs,
microservices, backend asynchronous jobs, and contributing to integration workflows. In this lab, we
will be walking through a simple, but non-trivial example of an Azure function that solves a common
healthcare data integration scenario.
In order to make this lab accessible to the broadest audience, all of the work will be done through the
Azure portal, and code will be supplied by copy-paste. Previous coding experience in any language
and familiarity with HTML are both helpful but not required.

LEARNING OBJECTIVES
 - Provision an Azure Function App Using the Azure Portal
 - Deploy a C# .NET Core Function in the App Based on the HTTP Trigger Template
 - Extend the Function Code to Scrape a Website and Return a URL

Solution: Already attempted one live POC on Java. so just skimming through this content.

6. 
-----------------------------------------------------------------------------------------------------------
Deleting all the resource groups at once in azure:

Say if you have all these resource groups in your azure,
	cloud-shell-storage-centralindia
	consumplgbypoc003_group
	DefaultResourceGroup-CHN
	DefaultResourceGroup-ClD
	DefaultResourceGroup-CUS
	DefaultResourceGroup-EUS
	DefaultResourceGroup-null
	DefaultResourceGroup-OS
	DefaultResourceGroup-QAC
	DefaultResourceGroup-SCUS
	dem009uwe_group
	rg-app-240410144332
	rg-app-240410165733
	rg-app-240410165824
	rg-app-240410170049

You can use the Remove-AzResourceGroup cmdlet to delete resource groups in Azure PowerShell. Here's how you can force delete each of the listed resource groups:

# List of resource group names
$resourceGroups = @(
    "cloud-shell-storage-centralindia",
    "consumplgbypoc003_group",
    "DefaultResourceGroup-CHN",
    "DefaultResourceGroup-ClD",
    "DefaultResourceGroup-CUS",
    "DefaultResourceGroup-EUS",
    "DefaultResourceGroup-null",
    "DefaultResourceGroup-OS",
    "DefaultResourceGroup-QAC",
    "DefaultResourceGroup-SCUS",
    "dem009uwe_group",
    "rg-app-240410144332",
    "rg-app-240410165733",
    "rg-app-240410165824",
    "rg-app-240410170049"
)

# Delete resource groups
foreach ($resourceGroup in $resourceGroups) {
    Remove-AzResourceGroup -Name $resourceGroup -Force -Confirm:$false
}

This script iterates through the list of resource group names and deletes each one using the Remove-AzResourceGroup cmdlet. The -Force parameter ensures that the operation is performed without confirmation prompts. Adjust the list of resource group names as needed.

Deletinting individual resources:
Connect-AzAccount

Select-AzSubscription -SubscriptionName "<SubscriptionName>"

# Delete a resource group and all resources within it
Remove-AzResourceGroup -Name "<ResourceGroupName>" -Force

# Delete an individual resource (e.g., virtual machine)
Remove-AzVm -ResourceGroupName "<ResourceGroupName>" -Name "<VMName>" -Force
-----------------------------------------------------------------------------------------------------------
Monitoring:
Azure Monitor will first collect the data into Metrics and Logs.
Then it will send it to either  analysis section such as Log Analytics or Metiric Analytics.
Or it will send alerts in conjunctin with Logic apps.
-------------------------------
Metrics, logs and distributed traces are three pillers of Observability.
-------------------------------
UI options available under webapp:
Metrics
Diagnostic settigns - Here you can define 
										- the type of logs you want to collect
										- where you want to store those data.
										- Metrices
Log stream - 
what is the difference between Azure log stream and app service logs
Key Differences
	Real-Time vs. Persistent:
	Log Stream: Provides real-time log data without storing it.
	App Service Logs: Captures and stores logs for historical analysis.
	
	Use Case:
	Log Stream: Best for live debugging and immediate feedback.
	App Service Logs: Best for long-term monitoring, troubleshooting, and audits.
	
	Access and Storage:
	Log Stream: Accessed via the Azure Portal, not stored.
	App Service Logs: Configurable storage options (file system, Blob Storage, etc.), accessible via the Azure Portal and downloadable.
	-------------------------
	What is Azure Application Insights?
	It is equivalent to Dynatrace. So many funcationalities are same.
	Also Azure Monitor is part of Application insight and not the seperate service.
	There are two types of metrices:-
		- Log based - It provides indepth analysis but performnance not so good.
		- Standard - It has better performance.
	-------------------------
	Investigate:-
		Application map:- Equivalent to zipkin or Jaegar in sprinboot.
		Live Metrics:- This is equivalent springboot Micrometer and prometheus.
		Availability:- It is same as chaos monkey tool used by Netflix.
		Failures:-
		Performance:-
	-------------------------
	Usage:-
		Users
		Sessions
		Events
		Funnels:- It will give you aggregated information around user conversion and use drop persentages of your website or any certain page of your website.
		User Flow:- You can analyze indivdual users and their usage patterns.
	-------------------------
	Workbook:- It is the marketplace for so many different types of custom or specific monitoring and observability tools.
	-------------------------
	Data Sampling three types:-
		Sure, here are explanations of Adaptive, Fixed Rate, and Ingestion data sampling in Azure:

### 1. Adaptive Sampling

**What It Is:**
- Adaptive sampling dynamically adjusts the sampling rate based on the volume of telemetry data being collected. When the volume of data is high, the sampling rate increases (collecting fewer data points), and when the volume is low, the sampling rate decreases (collecting more data points).

**Why Use It:**
- This method helps maintain a balance between collecting enough data for analysis and not overwhelming the system or incurring high costs. It ensures that during peak times, the system is not flooded with too much data, while during off-peak times, more data can be collected for detailed analysis.

**Example:**
- If your web application experiences a sudden spike in user traffic, adaptive sampling will reduce the number of telemetry data points collected to prevent overloading the system. Conversely, during times of low traffic, it will collect more data points for more detailed insights.

### 2. Fixed Rate Sampling

**What It Is:**
- Fixed rate sampling consistently samples telemetry data at a predefined, constant rate. For example, it might collect 1 out of every 10 data points, regardless of the volume of data being generated.

**Why Use It:**
- This method is simple to implement and ensures a consistent, predictable amount of data is collected over time. It's useful when you want to control the exact proportion of data being sampled without any fluctuations.

**Example:**
- If you set a fixed rate sampling at 10%, it will consistently collect 1 out of every 10 telemetry data points, providing a steady stream of data for analysis.

### 3. Ingestion Sampling

**What It Is:**
- Ingestion sampling applies sampling at the point where data is ingested into the system. This means that the decision to sample (whether to keep or discard data) is made when the data first arrives, rather than after it has been processed.

**Why Use It:**
- This method is efficient in reducing the amount of data that needs to be processed and stored from the very beginning. It helps in controlling costs and system load by limiting the data volume right at the point of entry.

**Example:**
- In a scenario where your application generates large volumes of log data, ingestion sampling can be set up to immediately discard a certain percentage of logs as they come in, ensuring that only a manageable amount of data gets processed and stored.

### Summary

- **Adaptive Sampling:** Adjusts the sampling rate based on data volume, ensuring balance between data collection and system performance.
- **Fixed Rate Sampling:** Samples data at a consistent, predetermined rate, providing a steady and predictable data flow.
- **Ingestion Sampling:** Applies sampling at the data entry point, controlling the volume of data from the start and optimizing resource usage.

These sampling techniques help manage telemetry data efficiently, ensuring that you collect meaningful insights without overwhelming your systems or incurring excessive costs.
	-------------------------
	Azure Availability tests:

		Purpose:

		Monitoring: Azure Availability Tests are designed to monitor the availability and performance of web applications. They ensure that your application is accessible and performing well from various geographic locations.
		Functionality:

		URL Ping Tests: Simple checks to ensure the application is reachable and returning expected responses.
		Multi-Step Web Tests: Simulate complex user interactions to verify end-to-end functionality.
		Custom Track Availability Tests: Allow for custom availability checks using Application Insights SDK.
		Use Case:

		Primarily used for proactive monitoring to detect downtime or performance issues.
		Helps in maintaining uptime and ensuring consistent user experience.
	-------------------------
	-------------------------
	


-------------------------------
-------------------------------
-------------------------------
-------------------------------
-------------------------------
-------------------------------
-------------------------------

-----------------------------------------------------------------------------------------------------------
Azure Caching using Redis:-

-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------

