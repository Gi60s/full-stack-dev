---
title: Git 
description: A very brief introduction to Git version control system.
---

## What is Git?

- A file versioning system.
- Be able to revisit any point in history.
- Work on a single project simultaneously with other developers.
- Accept contributions to your code from anyone.
- Make changes without compromising stability.

## Repositories

- *Repository* - The current and past state of all of your tracked files since the creation of the git project.
- *Local Repository* - A repository on your own machine. Most of your work is done here.
- *Central Repository* - The repository that everyone uses to get code from and merges new code into.

**Exercise**

1. Visit [https://github.com](https://github.com) and create an account and/or log in.
2. Create a new central repository on Github.
3. Open a terminal and after each of the below steps issue the command `git status`.
    1. Clone the central repository onto your local machine: `git clone [repository_name]`.
    2. Add a file on your local machine.
    3. Stage the file: `git add [file_path]`.
    4. Commit the file: `git commit [file_path] -m [comment]`.
    5. Push the changes of the local repository up to the central repository: `git push`.
    6. Modify the file.
    7. Stage and commit: `git commit -a [file_path] -m [comment]`.
    8. Push changes to the central repository.

## Branches

Branches are useful for:

- Making changes without having to worry about ruining the active stable code.
- Contributing to existing code.

**Exercise**

Join up with a one of your peers. You will need to give your peer access to write to your github repository. You each will perform these steps on each other's repository from the terminal.

1. Clone the other repository to a new directory on your local machine. (Anyone can clone a public repository.) `git clone [repository_name]`
2. Create a new local branch: `git checkout -b [branch_name]`.
3. Check to see what branches you have locally: `git branch`.
4. Push the newly created branch to the central repository: `git push origin [branch_name]`.
5. Modify an existing file on the branch.
6. Stage and commit: `git commit -a [file_path] -m [comment]`.
7. Push your commits to the remote repository.

Through the github web interface:

1. Create a pull request: https://help.github.com/articles/creating-a-pull-request/
2. Have your classmate merge the pull request and delete the branch.

In your terminal:

1. Delete your local branch: `git branch -d [branch_name]`.

<question-answer q="If you are using code from someone else's repository and you identify and fix a bug, how do you get that fix back into the original repository, assuming your don't have write access to that repository?">

You would fork the orignal repository.

1. Open your web browser and navigate to the GitHub repository.
2. Click the icon to fork the repository. This puts a copy of it under your Git account.
3. Now you can do the same steps as above, including creating a pull request.

</queston-answer>
