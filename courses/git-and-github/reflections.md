
## Lesson One

How did viewing a diff between two versions of a file help you see the bug that
was introduced?

> It was pretty painless and quick to view the differences.

> The plus and minus signs were infinitely helpful, as it allowed me to access the info very quickly.

How could having easy access to the entire history of a file make you a more
efficient programmer in the long term?

> It could be a very time-efficient way to debug code that could take hours normally.

> It's also nice to see changes that have been made to assess whether they are relevant or not.

What do you think are the pros and cons of manually choosing when to create a 
commit, like you do in Git, vs having versions automatically saved, like Google
docs does?

#### Git:
##### Pros
> You can choose when to make commits.

> You get to see a literal history of personal commits, which helps with responsibility in teams projects.

##### Cons

> You may forget to make commits or you make irrelevant commits that are not helpful.

> You could also make too many commits.

#### Google Drive:
##### Pros
> Your computer may crash and your code is still saved

##### Cons

> There isn't much of a way to seperate different versions

> There won't be much of a branching system so no way of working off of different versions of the same file.

> Too many commits but no record of them.

Why do you think some version control systems, like Git, allow saving multiple
files in one commit, while others, like Google Docs, treat each file separately?

> Ultimately, a change worthy of a commit may need small tweaks in a number of files.

> This then means that when reviewing previous histories, it is very easy to see the changes.

> In GD, it is not necessarily obvious of the historical bigger picture.

How can you use the commands git log and git diff to view the history of files?

> I don't recognise the command git log.

> git diff is a great command that can quickly compare two large files.

> However, it is not efficient and comparing multiple files or commits (to my knowledge).

How might using version control make you more confident to make changes that
could break something?

> I already have some exp with this and it is very true that I can just make a breaking change, and I can reset it if needed.

> It means that I have more confidence manipulating my code and trying new things out.

Now that you have your workspace set up, what do you want to try using Git for?

> I can't wait to store all the changes of my notes!

How could having easy access to the entire history of a file make you a more efficient programmer in the long term?

> I imagine I'll be able to learn from my mistakes quicker.

> I will become reliant on having a history of a file and so will have more confidence to just code.

What do you think are the pros and cons of manually choosing when to create a commit, like you do in Git, vs having versions automatically saved, like Google Docs does?

#### Pros

> You get to control when you create a version of a project at every logical change.

> Every automatic save for GD is probably too much and makes it difficult to go through

> In fact, I have never used the history of GD for that reason

> It actually challenges you to really stay in the zone and actively stay engaged with your files. It means there can be no passive code as you need to think abouto commits constantly.

> It forces to you to question whether a change is needed or not.

> It improves your workflow and actually can improve your skills at coding.

#### Cons

> It adds a level of complexity to your projects. When should I commit? Why? What message? Is the commit too big or too small? Is it irrelvant?

> GD gives everyone the same option when committing versions. There is one rule.

Why do you think some version control systems, like Git, allow saving multiple files in one commit, while others, like Google Docs, treat each file separately?

> When using a VCS such a git, you are most likely using code and therefore there will be a lot of files to change simultaneously, I imagine.

> It allows you to see the project as a whole.

How can you use the commands git log and git diff to view the history of files?

> These two commmands are very useful.

> The first gives us information for every commit in a repo.

> The second can compare two different commits - displaying the actual changes between files (addition or deletion).

How might using version control make you more confident to make changes that could break something?

> Simply because I know that I can just look back at previous histories of my commits and debug my code.

> I can take huge risks and change a large amount of code in one go

> I can go deeper than w/out a VCS and explore more

Now that you have your workspace set up, what do you want to try using Git for?

> Oh my gosh, where do I start! I am very excited to start using it for lots of project.

> Actually, I have really come to see the massive benefits that git may be able to provide me.

> It's not only going to be about code but I'm really excited to start using git, and perhaps github, for things such as novel writing or research of political analysis.

> I could also use it for tracking my goals. This may seem a little silly but I think the addition of a timeline will be rather interesting to track - who knows?!

## Lesson Two

What happens when you initialize a repository? Why do you need to do it?

> When I inititalise a repo, a hidden file called .git will be created. This will essentially turn any directory into a repo.

> Note: there will be zero commits and untracked files and sub-directories until a commit is made.

> We need to initliase so that git can track any changes and allow for commits to be made along the way.

How is the staging area different from the working directory and the repository? What value do you think it offers?

> The staging area works between them, a bit like a mediator. It's important because it allows you to really control, with some detail, exactly what is to be committed to the repository.

> This is a heck of control!

How can you use the staging area to make sure you have one commit per logical change?

> It's a perfect way to really manage your work and to control what you want to commit! I could even break files down into their lines.

What are some situations when branches would be helpful in keeping your history organized? How would branches help?

> Branches are so helpful for experimentation, translations, new design work, etc. It keeps the master branch stable while being able to try out a bunch of new features quite painlessly.

> Branches are also very useful for when I'll be sharing my project pubicly!

How do the diagrams help you visualize the branch structure?

> Thankfully, I have some exp with visualising git branches but this visualsation is very useful.

> Git is quite difficult to understand conceptually, for a beginner, and the diagrams make sense of the branch struture.

> More importantly, it taught me the concept of reachability, and that the branch system should not be arbitrary. It matters.

What is the result of merging two branches together? Why do we represent it in the diagram the way we do?

> When you merge two branches together, the history of commits will combine to produce one linear order of timed commits.

> The diagram is useful as we can see the different roles that the branches can play. It also highlights how different the branches are, and the fact that a project can split up numerous times to become something completely different.

What are the pros and cons of Git’s automatic merging vs. always doing merges manually?

> Gits manual merges are very useful as you get to control exactly what ends up in the final file after a merge.

> Automatic merging is quicker and easier (especially for something quite simple or a quick edit) - but it gives you much less control.

> More importantly, it may mean that a legit error will get missed. It could introduce a bug.

## Lesson Three

When would you want to use a remote repository rather than keeping all your work local?

> It is a fundamental tool when collaborating as it allows a safe haven for code that is being used and edited by several developers.

> Additionally, it is useful when working from several different places or workstations.

> It is also just nice to know that your work is all safe on a server.

Why might you want to always pull changes manually rather than having Git automatically stay up-to-date with your remote repository?

> If there are several developers working on a number of different parts of a file, it may not be helpful to experience constant changes to that file.

> It would also seem unecessary and it allows the developer to control their project.

Describe the differences between forks, clones, and branches. When would you use one instead of another?

> Forks solely occur on GitHub. It is when I 'clone' a repo on somebody elses GitHub onto mine - for my personal use.

> Cloning can happen in two ways:
      
      1. I can clone a repo from GitHub to my local computer,
      2. I can clone a local repo to somewhere else on my local.

> Branching is quite different - it can only occur in one repo. It occurs when I want to make a change to my project but not on the most recent version of it.

What is the benefit of having a copy of the last known state of the remote stored locally?

> This was a new concept to me and I have found it tricky. I will revisit it as I dont think I can answer this question very well right now.
  
> However, it is useful as you can see your progression.

> It is also useful to be able to work offline for a while.

How would you collaborate without using Git or GitHub? What would be easier, and what would be harder?

> Collaboration could be possible in numerous ways.

> One of the primary ways that comes to my mind is via email or some sort of web program.

> It would be better in some ways, for people who dont have any exp with using Git or GitHub. Pull requests seem like such a faff just to get someone to review a bit of code!

> However, Git and GitHub are excellent at keeping track of lots of versions and information and it really is so much better at keeping track of bigger projects.

> This means that for big projects or big teams, Git and GitHub just make things easier to manage - even if there is a significant layer of complexity to start out with.

When would you want to make changes in a separate branch rather than directly in master? What benefits does each approach have?

> I think whenever you wish to make changes that may change the behaviour or visuals of a project, it is a good idea to set up a new branch.

> It may also be useful when debugging or when you just want to make a minor change, but would like feedback on that (with pull requests for instance).

> Also, if master is your production branch, then you do not want to make edits directly onto the master branch!
