
#Way to connect to Azure mysql instance using terminal
#Download the ssl certificate by going to the networking tab of azure mysql portal
#cd to the downloaded ssl cert folder and run below command
mysq1 -h demoserver-episode4.mysq1.database.azure.com -u mydemouser -p --ss1-mode=VERIFY CA --ss1-ca=DiiCertG10ba1RootCA.crt.pem

#Azure service bus topics non availability in basic plan.
	Topics are only available in the Standard and Premium pricing tiers 12. If you’re currently on the Basic tier, you won’t see the option to create topics. To enable topics, follow these steps:

	Go to the Overview section of your Azure Service Bus namespace.
	Look for the Pricing Tier setting.
	If it’s set to Basic, change it to Standard (or Premium).
	
------------	
#You can export the entire resource group along with the current state of each of these resources as a single ARM Template file or individually as well. 
For this just go to Resource group where all the resources are listed. On hte left nav bar, you will find exort template option under automation section. As soon as you will click it will generate the arm template as a json structure. Click on download, whcih would be somewhere on the top menu. As soon you'll click on download, a zip file will be downloaded which would contain two types of json file namely paramters and tempate.

- **template.json**: This file contains the actual definitions of the resources you want to deploy. It specifies the infrastructure and configuration settings for your Azure resources.

- **parameters.json**: This file contains the values for the parameters that are defined in the template file. It allows you to customize your deployment by providing specific values that the template will use during deployment.

When you import both files into the Azure portal, the parameters file will automatically populate the parameters defined in the template, making your deployment process smoother and more error-free. Remember to review and confirm the parameter values before starting the deployment to ensure they meet your current requirements.
------------
#Follow below steps to import the arm template, in order to start off from where you finished.
To import an ARM template into the Azure portal and deploy all the resources you've exported earlier, you can follow these steps:

1. **Navigate to the Azure Portal**: Sign in to your Azure account.
2. **Search for 'Deploy a Custom Template'**: Use the search bar at the top of the Azure portal to find the option to deploy a custom template.
3. **Choose Template Source**: Select 'Build your own template in the editor' if you have a custom template or choose a Quickstart template if applicable.
4. **Load Your ARM Template**: If you're building your own template, you can load your ARM template by clicking 'Load file' and selecting your `.json` file.
5. **Edit Template if Needed**: Make any necessary adjustments to your template in the editor.
6. **Create or Select Resource Group**: Choose an existing resource group or create a new one where your resources will be deployed.
7. **Review and Create**: After setting the parameters, review your settings and click 'Create' to deploy the template.

Remember, ARM templates are JSON files that define the resources you need to deploy for your solution¹². You can also find additional guidance and examples in the Azure Quickstart Templates repository¹.

For a detailed step-by-step guide, you can refer to the official Microsoft documentation on deploying ARM templates through the Azure portal¹².
------------	
Always rememember that we must always store the data or the data which is being flowed into the azure logic workflow should always be or converted to (if not already) json/xml format. We should never deal with a raw data. Azure logic app doesn provide any methodology to deal with raw data.
------------	


------------	


