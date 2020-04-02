---
title: Infrastructure as Code
toc: 1
---

# What is Infrastructure as Code

From [Wikipedia](https://en.wikipedia.org/w/index.php?title=Infrastructure_as_code):

> Infrastructure as code (IaC) is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

Break that down:

- **Managing and provisioning** - set up, configuration, and allocation of computer resources.

- **Interactive configuration tools** - a web interface where you can manually allocate and configure your infrastructure by clicking buttons, filling in forms, etc.

- **Machine-readable definition files** - some code

# Popular Infrastructure as Code Tools

- [AWS CloudFormation](https://aws.amazon.com/cloudformation/) - built by Amazon to be run on AWS.

- [Azure Resource Manager](https://azure.microsoft.com/en-us/features/resource-manager/) - built by Microsoft to run on Azure.

- [Google Cloud Deployment Manager](https://cloud.google.com/deployment-manager/) - built by Google to run on Google Cloud.

- [Terraform](https://www.terraform.io/) - built by HashiCorp to run on AWS, Azure, and Google Cloud.

There are others also.

# Terraform

https://www.terraform.io/

- Just because it runs on all three big cloud providers does not mean that you can write one configuration that works on all three providers.

- Each provider still requires provider specific configurations.

- The syntax and logic is the same despite the cloud provider being written for.

- Configurations are idempotent.

## Resources

- Resources are the different part of the infrastructure you want to set up.

- Every resource has a defined resource type, name, and inputs as can be seen in this example:

    ```
    resource "<resource_type>" "<resource_name>" {
        <key_1> = "<value>"
        <key_2> = "<value>"
    }
    ```

- Resources also often have outputs that other resources can read from.

### Example Resource

An example for provisioning an AWS S3 bucket:

```
resource "aws_s3_bucket" "b" {
  bucket = "my-tf-test-bucket"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
```

1. Check out the [aws_s3_bucket resource type documentation](https://www.terraform.io/docs/providers/aws/r/s3_bucket.html).

2. Look at some of the examples: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#example-usage

3. Look at the input values: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#argument-reference

4. Look at the exported values: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#attributes-reference

## Variables

## Output

# Terraform State

# Example

Put an example into IT410 resource
