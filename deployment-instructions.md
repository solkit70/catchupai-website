# Deployment Instructions for Catch Up AI Website

This document provides step-by-step instructions for deploying the Catch Up AI website to Amazon S3 and connecting it to your domain using Amazon Route 53.

## Prerequisites

1. An AWS account
2. The domain `catchupai.net` registered with Amazon Route 53
3. The website files ready for upload

## Step 1: Create an S3 Bucket

1. Sign in to the AWS Management Console
2. Go to the S3 service
3. Click "Create bucket"
4. For the bucket name, enter `catchupai.net`
5. Select your preferred region
6. Uncheck "Block all public access"
7. Acknowledge that the bucket will be public
8. Keep default settings for the rest of the options
9. Click "Create bucket"

## Step 2: Configure the S3 Bucket for Website Hosting

1. Go to the newly created bucket
2. Click on the "Properties" tab
3. Scroll down to "Static website hosting" and click "Edit"
4. Select "Enable" for Static website hosting
5. Set "Index document" to `index.html`
6. Set "Error document" to `index.html` (for SPA routing)
7. Click "Save changes"
8. Note the bucket website endpoint (it will look like `http://catchupai.net.s3-website-us-east-1.amazonaws.com`)

## Step 3: Add Bucket Policy for Public Access

1. Go to the "Permissions" tab of your bucket
2. Click "Bucket policy"
3. Add the following policy (replace `catchupai.net` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::catchupai.net/*"
    }
  ]
}
```

4. Click "Save changes"

## Step 4: Upload Website Files

1. Go to the "Objects" tab of your bucket
2. Click "Upload"
3. Upload all files and folders from your local website directory
   - Make sure to maintain the directory structure
   - Include all HTML, CSS, JavaScript, and image files
4. Click "Upload"

## Step 5: Configure Route 53 to Point to S3

1. Go to the Route 53 service in the AWS Management Console
2. Go to "Hosted zones"
3. Click on your domain (`catchupai.net`)
4. Click "Create record"
5. Keep the subdomain empty (for the apex domain)
6. For "Record type", select "A"
7. Enable "Alias"
8. For "Route traffic to", choose "Alias to S3 website endpoint"
9. Select the region where your bucket is located
10. Choose your S3 bucket endpoint from the dropdown
11. Keep "Routing policy" as "Simple routing"
12. Click "Create records"

### For www Subdomain (Optional)

1. Click "Create record" again
2. For "Name", enter "www"
3. For "Record type", select "A"
4. Enable "Alias"
5. For "Route traffic to", choose "Alias to S3 website endpoint"
6. Select the region where your bucket is located
7. Choose your S3 bucket endpoint from the dropdown
8. Keep "Routing policy" as "Simple routing"
9. Click "Create records"

## Step 6: Verify Your Website

1. Wait a few minutes for DNS propagation
2. Visit `http://catchupai.net` in your browser
3. Your website should now be live

## Step 7: Set Up HTTPS with CloudFront (Recommended)

For a secure website with HTTPS, you'll need to set up CloudFront:

1. Go to CloudFront in the AWS Management Console
2. Click "Create Distribution"
3. For "Origin domain", select your S3 bucket website endpoint
4. For "Origin path", leave it empty
5. Keep the defaults for "Origin shield" and "Origin key"
6. For "Viewer protocol policy", select "Redirect HTTP to HTTPS"
7. For "Allowed HTTP methods", select "GET, HEAD"
8. For "Default root object", enter `index.html`
9. Under "Settings", check "Use all edge locations"
10. For "Alternative domain names (CNAMEs)", enter `catchupai.net www.catchupai.net`
11. For "Custom SSL certificate", request or import a certificate using AWS Certificate Manager
12. Click "Create distribution"
13. After the distribution is created, update your Route 53 records to point to the CloudFront distribution instead of the S3 bucket

## Updating Your Website

To update your website:

1. Make changes to your local files
2. Upload the modified files to your S3 bucket, replacing the existing files
3. If you're using CloudFront, you may need to create an invalidation to clear the cache

## Troubleshooting

1. **Website not accessible**: Check your bucket policy and make sure public access is enabled
2. **CSS/JS not loading**: Verify MIME types and file paths
3. **Route 53 not working**: Check if DNS propagation is complete (can take up to 48 hours)
4. **HTTPS not working**: Verify SSL certificate in CloudFront