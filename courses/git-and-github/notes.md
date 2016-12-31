
## Lesson One

// Commits

- Commits are user-created checkpoints. They take a manual save approach as they are meant to represent meaningful and logical changes in the history of a project.
- Each commit represents a version of a project at one point in time.

// Viewing a project history

- using the git log in the console will show every change made.
- This starts with the most recent.
- each commit has:
    1. An ID
    2. An author
    3. A date
    4. A description or message

- It's possible to check the changes using the git diff command.

// When to commit

- It's important not to make commits too big or too small.
- Big commits will be cumbersome and difficult to understand.
- Small commits will produce such a large number of commits over a short space of time.
- Therefore, it's important to make a commit at <em>each logical change</em>.
- Examples include:
    -> Fixing a typo
    -> Fixing a bug
    -> NB: The above two should be committed separately/

// Comitting multiple files

- It is possible to commit multiple files in one go.
- It could be useful to use the --stat addition to display some statistics when using git log.

// Cloning a repo

- When downloading a repo, we want to use git clone - as this downloads the entire repos history.
- It is not enough to simply download a project as this will just give us the existing (the most recent) commit.

// Error msgs

- Uh-oh! Git provides alwful, cryptic error msgs and they can be tricky to decipher.
- 'Should not be doing an octopus' - This is bizarre but this msg displays when you are trying to use the octopus strategy in an inappropriate way.
- 'in a detatched "HEAD" state' - the HEAD is simply the commit that you are currently on. You can detatch the HEAD by moving to a previous commit. NB: This is not always a bad thing to do.

## Lesson 2

// This is an example of a commit message

feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequenses of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789

// Git commit msg types

The type (contained within the title) can be one of these types:

    feat: a new feature
    fix: a bug fix
    docs: changes to documentation
    style: formatting, missing semi colons, etc; no code change
    refactor: refactoring production code
    test: adding tests, refactoring test; no production code change
    chore: updating build tasks, package manager configs, etc; no production code change

// Git diff revisited

    There are several things we can compare.
    1. Compare two commits using their ids (with two IDs)
    2. Compare the working directory and the staging area (using just git diff)
    3. Compare the most recent commit in the repo with the staging area (using the option --staged)

// Reset

    We can reset any changes in the working directory OR the staging area using reset --hard.
    This needs to be used very carefully though!

// Reachability

    - This is a useful concept. When on a branch, it is useful to visualise the previous commit as it's parent.
    - When thinking about accesible/inaccessible commits, it is useful to see them through parents.
    - For instance, if you checked out a previous commit and made experimental changes - then COMMITTED that - that commit would be inaccesible. It's advisable to turn this into an exp branch.

// Merging simple files

    - It's tricky to know what files to include in the final file.
    - It's useful to know what the iniital file contained.
    - If something was deleted, don't inlcude in final.
    - If something was added, include it.
    - If multiple users left a line unchanged, then keep it in.

// Deleting branches

    - use git branch -d <branch>
    - It's important to note that when a branch is merged into a master, or parent, branch - the commit history is also imported (merged).
    - Therefore, it is useful to delete an obsolete branch.
    - However, this doesn't delete the commit history (as that was merged too), but it just deletes the label of the branch.
    - The commit history can now be accessed through the parent branch.
    - However, if a branch is deleted without merging it to a branch, then you would be abandaoning any work/commits made on that branch and it would be lost.
    - NB: Technically, the lost commit IDs could still be accessed until gits garbage collection is run. This is auto, but can be done manually using git gc.
    - Once merged, a git log would show all commits from both branches. They would be in order of timestamp.

// Git diff after merges

    - It's an interesting side effect but after a merge, a git diff between two commits that were on different branches will show a lot more info.
    - To show the difference between a commit and its parent, you would use git show <commit id>.
    - This is because a commit doesnt show what its parent was.

// Merge conflicts

    - Git is quite clever and actually, it will produce a merge conflict when it is unsure between two versions of a line(s).
    - It can not automatically merge conflicts and will require some user input.

## Lesson Three

// Forking
    Allows somebody to make a copy of a remote repo.
    Forking is essentially the same as a clone, but on your GitHub.
    It is also kept a track of.
// Merging remote conflicts
    It's important to note that these are equivalent:
    1. git pull origin master
    2. git fetch origin -> git merge master origin/master
// Fast-forward merges
    Occurs when two commits are made where one is an ancestor of the other (reachable).
    NB: the only criteria is whether a branch is reachable or not.

## Useful Git Commands

// checkout
    Temporarily reset all files in a repo to their state at the time of a specific commit.
    Takes one argument - the commit ID to restore.
// log
    Shows the commits made in a repo, starting with the most recent.
    No arguments taken.
    // options
        -nx: This will show a number of commits equivalent to x (e.g. -n1 shows one commit.)
// diff
    Compares two commits, printing each line that is present in one commit but not the other.
    Takes 2 arguments - the IDs of two commits.
    NB: You want to put the most recent ID second as git will then show any more recent updates with plus signs. The other way shows them as deletions.
// clone
    Make a copy of an entire Git repo, including the history, onto your comp.
    Takes 1 argument - the URL of the remote repo.
// init
    This command creates a new repo. NB: It doesn't actually create any commits!
// status
    This command shows what files have changed since the last commit.
// add
    This simple command will add files to the staging area.
// reset
    This command will remove files from the staging area.
// branch
    This makes a new branch
    // make branch and checkout
        There is this combined command:
        git checkout -b new_branch_name
// remote
    View and make remotes
// fetch
    GitHub stores a local copy of the remote. git fetch updates the local copy of the remote without changing the local HEAD of the repo.