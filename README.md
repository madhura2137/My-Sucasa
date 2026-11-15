# MySuCasa: Cloud Practical Walkthrough

This practical deploys the **original MySuCasa Next.js website**. The website remains in this repository's `src/` folder and is what runs locally, in Docker, and on Kubernetes. The S3/Lambda part uses a sample property JSON record; it is a separate cloud event exercise and does not replace MySuCasa's Firebase property data flow.

## Project files used in the practical

| Path | Purpose |
|---|---|
| `src/`, `package.json` | The original MySuCasa Next.js website |
| `Dockerfile`, `.dockerignore` | Build the website container image |
| `k8s/my-sucasa-app.yaml` | Kubernetes Deployment and NodePort Service |
| `property/sample-listing.json` | Sample object for the S3 event practical |
| `aws/ec2-role-policy.json` | Allow EC2 to upload to `property/` only |
| `aws/lambda-role-policy.json` | Allow Lambda to read `property/`, write `processed/`, and publish to SNS |
| `lambda/lambda_function.py` | Create a summary and send an SNS notification |
| `lambda/test-event.json` | Sample event for the Lambda console test |

## Placeholders to replace

| Placeholder | Your value |
|---|---|
| `<github-username>` | Your GitHub username |
| `<repository-name>` | Name of your GitHub repository containing MySuCasa |
| `<dockerhub-username>` / `DOCKERHUB_USERNAME` | Your lowercase Docker Hub username |
| `YOUR-BUCKET-NAME` | Your unique S3 bucket name (lowercase) |
| `YOUR-ACCOUNT-ID` | Your 12 digit AWS account ID |
| `<public-IP>` | The public IPv4 address shown for your EC2 instance |

Use AWS region **Asia Pacific (Mumbai), `ap-south-1`** throughout. In commands below, replace placeholders without the angle brackets.

---

## Step 1: Accounts, cost safety and tools

Have Git, Node.js 20+, npm, Docker Desktop, a GitHub account, a Docker Hub account, and an AWS account ready. Confirm Docker Desktop is running before you build the image. Use the guide's AWS account security instructions: protect the root user with MFA, create a budget alert, and check the billing dashboard during the practical. AWS work begins at Step 6; clean up at Step 12.

In PowerShell, check the local tools:

```powershell
git --version
node --version
npm --version
docker version
```

## Step 2: Save the project to GitHub

Open PowerShell in the MySuCasa project root (the folder containing `package.json`). If you already cloned your GitHub repository, keep using that repository and remote. Otherwise create an empty GitHub repository, then run:

```powershell
git init -b main
git add .
git commit -m "Prepare MySuCasa cloud practical"
git remote add origin https://github.com/<github-username>/<repository-name>.git
git push -u origin main
```

If Git says that `origin` already exists, check it with `git remote -v` and use the correct existing remote instead of adding another one. Do not commit `.env.local` or any API keys.

**You should see:** the project files, including `Dockerfile`, `k8s/`, `aws/`, and `lambda/`, in your GitHub repository.

## Step 3: Run the original website on your laptop

In PowerShell, from the project root:

```powershell
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the MySuCasa home page with its Buyer, Renter, Seller and other role cards. Stop the server with **Ctrl+C**.

Some AI and map features need API keys. Use `.env.example` as a reference, put your own values in `.env.local`, and keep that file private. The basic home page can be viewed without setting those optional keys.

## Step 4: Build and run MySuCasa with Docker

Make sure Docker Desktop is running. From the project root:

```powershell
docker build -t my-sucasa:v1 .
docker run -d --name my-sucasa -p 8080:3000 my-sucasa:v1
docker ps
```

Open [http://localhost:8080](http://localhost:8080). This should show the **same original MySuCasa website**. Inspect the container with:

```powershell
docker logs my-sucasa
docker stop my-sucasa
docker rm my-sucasa
```

If the container name is already used, remove the stopped container with `docker rm -f my-sucasa` and start it again.

## Step 5: Publish the image to Docker Hub

Sign in to Docker Hub from PowerShell, then build and push a multi-platform image:

```powershell
docker login
docker buildx build --platform linux/amd64,linux/arm64 -t <dockerhub-username>/my-sucasa:v1 --push .
docker buildx imagetools inspect <dockerhub-username>/my-sucasa:v1
```

Replace both occurrences of `<dockerhub-username>`. The image name in the Kubernetes file must use the same username and tag.

**You should see:** the `my-sucasa:v1` image in your Docker Hub account.

---

## Step 6: Create the S3 bucket and EC2 upload role

In AWS Console, switch to **Asia Pacific (Mumbai) `ap-south-1`**. Create a globally unique S3 bucket and leave **Block all public access** enabled. The practical only needs private object uploads.

In `aws/ec2-role-policy.json`, replace `YOUR-BUCKET-NAME` with the bucket name. In IAM, create a policy from this JSON, then create an EC2 role trusted by the EC2 service and attach that policy. Give the role/instance profile a clear name such as `MySuCasaEC2Role`. This role grants only `s3:PutObject` to the bucket's `property/` objects; it does not make the website public or upload Firebase data.

## Step 7: Launch EC2 and connect by SSH

Follow the class guide to launch its recommended Ubuntu EC2 instance in `ap-south-1`, attach `MySuCasaEC2Role`, create/download a key pair, and configure the security group. Allow SSH (TCP 22) from **your IP** and the web port (TCP 30080) for the browser. Keep the private key file safe and use it only from your laptop.

Connect using the SSH command and key pair path from the guide. On Windows PowerShell, the command shape is:

```powershell
ssh -i .\your-key.pem ubuntu@<public-IP>
```

Replace the key path and address. Accept the first-connection host prompt only if the address matches your EC2 instance.

**You should see:** an Ubuntu shell prompt on the EC2 server. Check the attached role from the instance using the guide's IAM role check; do not configure access keys on the server.

## Step 8: Install K3s and deploy MySuCasa

In the EC2 SSH session, install K3s using the class guide. Then verify Kubernetes is ready:

```bash
sudo kubectl get nodes
```

Get the project onto EC2. If the GitHub repository is public, clone it; otherwise transfer the project files using the method demonstrated in class. For example:

```bash
git clone https://github.com/<github-username>/<repository-name>.git
cd <repository-name>
```

Edit `k8s/my-sucasa-app.yaml` and replace `DOCKERHUB_USERNAME` with your Docker Hub username. The manifest deploys the original Next.js site on container port 3000 and exposes NodePort 30080. Apply it:

```bash
sudo kubectl apply -f k8s/my-sucasa-app.yaml
sudo kubectl get pods
sudo kubectl get services
```

Wait until the pod is `Running`, then open `http://<public-IP>:30080` in your laptop browser. You should see the MySuCasa homepage. If the pod is not ready, inspect it with `sudo kubectl describe pod <pod-name>` and `sudo kubectl logs deployment/my-sucasa`.

### Use the EC2 role to upload the sample property object

This sample object is for the S3/Lambda exercise, separate from the website's live Firebase listings. From the project root on EC2, install the AWS CLI if the class image does not already include it, then check the attached role and upload:

```bash
aws sts get-caller-identity
aws s3 cp property/sample-listing.json s3://YOUR-BUCKET-NAME/property/sample-listing.json
```

Replace the bucket name. The `get-caller-identity` output should identify the assumed EC2 role. The upload will be used to trigger Lambda after Step 10 is configured.

## Step 9: Create the SNS email topic

In the AWS Console, open SNS in `ap-south-1`, create a **Standard** topic named `my-sucasa-alerts`, and create an email subscription using your email address. Open the confirmation email and confirm the subscription. Copy the topic ARN; you will use it in Step 10.

**You should see:** the subscription status change to `Confirmed` in SNS.

## Step 10: Create the Lambda function and S3 trigger

In `aws/lambda-role-policy.json`, replace `YOUR-BUCKET-NAME` and `YOUR-ACCOUNT-ID`. In IAM, create a Lambda execution role trusted by Lambda and attach this policy. It grants read access to `property/`, write access to `processed/`, and publish access to the `my-sucasa-alerts` SNS topic.

In Lambda, create a function named `MySuCasaPropertyProcessor` using the Python runtime shown in the class guide. Upload `lambda/lambda_function.py` as `lambda_function.py` and set the handler to `lambda_function.lambda_handler`. Attach the IAM role above. Add environment variable `SNS_TOPIC_ARN` with the ARN copied in Step 9.

Add an S3 trigger on your bucket for **all object-created events**, with prefix `property/` and suffix `.json`. The prefix matters: Lambda writes summaries under `processed/`, so its output will not trigger itself again.

Test from the Lambda console with `lambda/test-event.json` after replacing `YOUR-BUCKET-NAME`. The sample object must already exist at `property/sample-listing.json`. Review the test result and Lambda logs.

## Step 11: Run the complete practical

1. Open `http://<public-IP>:30080` and confirm MySuCasa loads from the EC2/K3s deployment.
2. Upload `property/sample-listing.json` to `s3://YOUR-BUCKET-NAME/property/` from the EC2 instance using its attached role.
3. In S3, confirm the sample JSON is under `property/` and a new summary appears under `processed/`.
4. In Lambda, check the latest invocation and logs for success.
5. Check the inbox for the SNS email. Check spam/junk if it is not in the inbox.

For a second run, upload a new JSON object name under `property/` so S3 creates a new event.

## Step 12: Clean up AWS resources

After saving any screenshots or results required by your class, follow the guide's cleanup list. At minimum:

1. Delete the MySuCasa Kubernetes Deployment and Service, or terminate the EC2 instance if finished.
2. Delete the Lambda S3 trigger and function.
3. Empty the S3 bucket, then delete the bucket.
4. Delete the SNS subscription and topic.
5. Delete the Lambda and EC2 IAM roles, instance profile, and custom policies created for this practical.
6. Delete the EC2 key pair if it was created only for this practical, and check that no other EC2 instances or billable resources remain running.
7. Check AWS Billing/Cost Management and your budget alert.

Do not delete resources that belong to another project. Confirm the AWS region is `ap-south-1` while checking for remaining resources.

## Common checks

| Issue | Check |
|---|---|
| Local website does not start | Run `npm ci` from the folder containing `package.json`, then `npm run dev`. |
| Docker cannot connect | Start Docker Desktop and wait for the engine to be ready. |
| Port 8080 is occupied | Change the left side of the mapping, e.g. `-p 8081:3000`, and open port 8081. |
| Kubernetes pod is `ImagePullBackOff` | Check the Docker Hub username/tag in `k8s/my-sucasa-app.yaml` and confirm the pushed image is public or cluster credentials are configured. |
| Website cannot be opened on EC2 | Confirm the pod is ready, service uses NodePort 30080, and the EC2 security group allows inbound TCP 30080. |
| S3 upload is denied | Confirm the instance has the EC2 role, bucket name and region match, and policy resource ends in `/property/*`. |
| Lambda did not run | Check the trigger prefix/suffix, function logs, object key, and that the uploaded file is JSON under `property/`. |
| No SNS email | Confirm the email subscription and `SNS_TOPIC_ARN`; check spam/junk and Lambda logs. |

Never put AWS access keys, `.env.local`, or private SSH keys in GitHub, a Docker image, or the Kubernetes manifest.
