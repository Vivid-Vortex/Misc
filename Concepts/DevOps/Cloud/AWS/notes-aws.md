List the key AWS Free Tier services again and explicitly categorize each as "Always Free," "12 Months Free," or "Trials."

Here are the key services included in the AWS Free Tier, with their respective free tier types:

---

### Key Services Included in the AWS Free Tier

**1. Compute (EC2 - Elastic Compute Cloud)**
* **Free Tier Type:** **12 Months Free**
* **Allowance:** 750 hours per month of `t2.micro` or `t3.micro` instance usage (Linux, RHEL, SLES, or Windows). This is sufficient to run one `micro` instance continuously for the entire month.

**2. Storage (S3 - Simple Storage Service)**
* **Free Tier Type:** **12 Months Free**
* **Allowance:** 5 GB of standard S3 storage, 20,000 Get Requests, and 2,000 Put Requests per month.

**3. Serverless (AWS Lambda)**
* **Free Tier Type:** **Always Free**
* **Allowance:** 1 Million free requests per month and 3.2 Million seconds of compute time per month.

**4. Databases (Amazon RDS & DynamoDB)**
* **Amazon RDS (Relational Database Service):**
    * **Free Tier Type:** **12 Months Free**
    * **Allowance:** 750 hours per month of `db.t2.micro` or `db.t3.micro` instance usage (across all supported database engines). 20 GB of General Purpose (SSD) storage.
* **Amazon DynamoDB (NoSQL Database):**
    * **Free Tier Type:** **Always Free**
    * **Allowance:** 25 GB of storage. 25 units of write capacity and 25 units of read capacity per month (enough to handle up to 200 million requests per month).

**5. Networking & Content Delivery (Amazon CloudFront)**
* **Free Tier Type:** **Always Free**
* **Allowance:** 1 TB of data transfer out per month. 10 Million HTTP(S) requests per month.

**6. Monitoring (Amazon CloudWatch)**
* **Free Tier Type:** **Always Free**
* **Allowance:** 10 custom metrics, 10 alarms, 1 Million API requests, 5 GB of Log Data Ingestion.

**7. Messaging (Amazon SNS, SQS)**
* **Amazon SNS (Simple Notification Service):**
    * **Free Tier Type:** **Always Free**
    * **Allowance:** 1 Million publishes, 1 Million HTTP/S deliveries, 100,000 email deliveries.
* **Amazon SQS (Simple Queue Service):**
    * **Free Tier Type:** **Always Free**
    * **Allowance:** 1 Million requests per month.

---

**Important Reminders:**

* **Always consult the official AWS Free Tier page** on the AWS website for the most current and comprehensive details, as specific allowances and service inclusions can change over time.
* **Monitor your usage** in the AWS Billing Dashboard to avoid exceeding Free Tier limits and incurring charges.