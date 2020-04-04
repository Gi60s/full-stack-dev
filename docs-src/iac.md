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

## Terraform Components

### Resources

- Resources are the different part of the infrastructure you want to set up.

- Every resource has a defined resource type, name, and inputs.

- Resources also often have outputs that other resources can read from.

- Generally you put your resources into a file called `main.tf`.

**Resource Structure**

```ruby
resource "<resource_type>" "<resource_name>" {
    <key_1> = "<value>"
    <key_2> = "<value>"
}
```

**Resource Example**

This example provisions two AWS S3 buckets (data storage). One of these keeps track of who accesses the bucket and stores those logs into the other bucket.

```ruby
resource "aws_s3_bucket" "log_bucket" {
  bucket = "my-tf-log-bucket"
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "b" {
  bucket = "my-tf-test-bucket"
  acl    = "private"

  logging {
    # for the target bucket we reference the output id from the log_bucket
    target_bucket = "${aws_s3_bucket.log_bucket.id}"
    target_prefix = "log/"
  }
}
```

**Learn More About the aws_s3_bucket Resource**

1. Check out the [aws_s3_bucket resource type documentation](https://www.terraform.io/docs/providers/aws/r/s3_bucket.html).

2. Look at some of the examples: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#example-usage

3. Look at the input values: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#argument-reference

4. Look at the exported values: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#attributes-reference

### Variables

https://www.terraform.io/docs/configuration/variables.html

- Variables are used to provide input for sets of resource definitions.

- Variables can be provided through command line flags or through prompts.

- Variables can be required or optional.

- A common practice is to create a `variables.tf` files for these inputs.

- Every variable has a name and a type. The description and default value are optional.

- Variable types here: https://www.terraform.io/docs/configuration/variables.html#type-constraints

**Variable Structure**

```ruby
variable "<variable_name>" {
    type        = "<value>"
    description = "A description of what this variable is"
    default     = "An optional default value"
}
```

**Variable Example**

```ruby
variable "environment" {
    type        = "string"
    description = "The environment being provisioned for. Ex: dev, stage, prod"
    default     = "dev
}

resource "aws_s3_bucket" "b" {
  bucket = "my-tf-test-bucket"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = var.environment
  }
}
```

### Output

https://www.terraform.io/docs/configuration/outputs.html

- All resources produce some output values.

- Your terraform configuration can also output properties to be used by other terraform configurations.

- A common practice is to create an `output.tf` file for your outputs.

**Output Structure**

```ruby
output "my-output-value" {
  value = <resource_type>.<resource_name>.<resource_property>
}
```

**Output Example**

```ruby
resource "aws_s3_bucket" "b" {
  bucket = "my-tf-test-bucket"
  acl    = "private"
}

# Other terraform files that use this as a module can read this output
output "my-s3-bucket-id" {
    value = aws_s3_bucket.b.id
}
```

### Modules

- A module is a directory with terraform files.

- Modules are intended to create reusable resource definitions.

- Generally a module will accept inputs.

- You can define in a terraform file what modules you want to use and what inputs you want to provide it.

**Module Usage Syntax**

```ruby
module "<module_name>" {
    # The path to the module
    source      = "./path/to/module/directory"

    # Module variable inputs
    var-x       = "foo"
}
```

## Terraform State

- Terraform needs to keep track of the state of deployments.

- You may have a local terraform state file `terraform.tfstate` after applying a terraform configuration.

- It is bad practice to push your terraform state file to github, instead configure state to be stored to a central location that is readable and writable. Terraform has ways to do this easily with the major cloud providers.

## Terraform Commands

Run each of these commands in the directory with your `main.tf` file.

- `terraform plan` - Gives you a plan on what changes would occur.

- `terraform apply` - Gives you a plan and requires verification, then provisions the infrastructure in the cloud.

- `terraform destroy` - Destroy the infrastructure that was previously provisioned.

## Full Example

There is a working terraform example at https://github.com/Gi60s/it410-resources in the `terraform` directory.
