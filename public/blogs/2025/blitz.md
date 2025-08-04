#title An Interconnected PI Network Project
#date 2024-01-15
#excerpt The challenges, the issues and the positives I encountered while developing, testing and integrating a interconnected raspberry pi network for FRC from scratch.
#author Lebron James
#category Software
#readtime 10 min
#image /blitz_photos/interconnection.png

![BLITZ Pi Network Interconnection](/blitz_photos/interconnection.png)

# Notes

1. If you came from Chief Delphi, please skip the first 2 sections as its just a copy paste from there.
2. English is not my first language. Thus, in order to communicate the things that I want to say properly and interestingly, I will use chatgpt for some parts of this blog post. Please note though that **this is NOT chatgpt slop** as I have spent hours on this one post. That said, enjoy my journey :).

# Introduction

Over the past year, my team has been experimenting with a system I’ve been building—an integrated Raspberry Pi network called **BLITZ**. In BLITZ, each Pi can communicate directly with any other Pi without relying on a central controller or the main robot frame. Despite this independence, the system remains strongly typed and connected to the robot’s primary computer.

BLITZ is highly scalable: it supports any number of Raspberry Pis and works seamlessly across languages like Java, Rust, and Python. It’s also easy to test—any machine (Linux, macOS, or Windows) can connect and interact with the system locally. Message latency is minimal: under 1ms internally and under 5ms between Pis or between a Pi and the robot computer—all while preserving strong typing and compatibility with existing software.

# Motivation

I’ve always wanted to create a system that could dynamically scale and adjust to changing workloads. However, current FRC tools don’t offer the level of customization required. For example, PhotonVision handles most of its backend operations internally, limiting the flexibility to extend or modify its behavior. I’ve also always been a huge fan of modularity—being able to switch out components, languages, or hardware without rewriting the entire system. With BLITZ, each program can be developed, tested, and deployed independently, making it easy to upgrade, replace, or repurpose parts of the network without affecting the rest. This modular approach allows for faster iteration, better fault isolation, and more flexibility when designing complex robot systems.

![Modularity](/blitz_photos/modularity.jpg)

I believe NetworkTables are often misused. They’re designed to synchronize shared state across devices—not for low-latency message passing, which is what my use case demands. What I needed was a fast, lightweight way to pass messages between Pis with minimal delay and overhead—something BLITZ was built to solve.

So what is this BLITZ magic and how have I developed this piece of technology?

# The Beginning

Around September last year I was getting into more multi-processing and off-robot workload distribution. This was mainly because I was inspired to make a truly human-less driver--a feet that would not be possible without a lot of processing power which could only be gotten from the off-mainframe raspberry PIs. I was especially inspired by Lidar technology which could be used to make realtime maps of the world around the robot in real time (SLAM). Something about the whole automatically mapping an evolving environment while moving and pathfinding around really appealed to my software brain. Thus, I wanted to bring this technology to FRC.

One of the first issues that I encountered was that while you were able to use a raspberry pi to do something off-roborio, it was quite hard to make it actually work properly especially in a competition-like setting for several reasons:

1. Deploying to the PI is very trivial as you are not able to just deploy to the robot some code and have one part of the code go to the pi. Instead, you must write corresponding code for the PI and the robot separately and figure out a way to copy files form your main computer to the PI
2. Even if you did figure out a way to copy files, starting the process at a given time (for example startup of the robot) was quite trivial as that requires your robot to send some sort of a signal to some sort of a inf-running program to start doing some task
3. Sending some information between processes inside the PI is quite trivial as you can't just give a variable over to another process and just writing to a file is not efficient enough and requires a lot of code to actually get working correctly (not to mention that that method would not even work if you wanted to communicate between different PIs)
4. You could not really code in different languages to utilize their benefits and negatives easily (for example, I'm a big rust fan because it serves as a c++ replacement in my eyes but I just could not work with that).

To add salt to the wound, all of the teams were using software such as Photon Vision and Limelight which gave them easy access to vision tasks (and probably others) while managing the backend (note: from now on, I will be referring to the raspberry PIs as the "backend" of the robot) completely on their own. I was not a fan of this because, again, I love the concept of modularity and the freedom to use whatever you want--not grounded by some tool that, for example, does not allow you to do one thing or the other.

![Limelight](/blitz_photos/limelight.webp)

### Note

_Some people may suggest I use ROS and, believe me, I HAVE TRIED to get into ROS for the exact reason of wanting to get access to the myriad of SLAM/vision/other projects that it has to offer while also being highly performant. BUT the problem with ROS is that while it is great for researchers and others, setting it up (especially on a non-linux computer) is **HELL**. Additionally, it uses a language that I dislike for small-ish projects -- C++. I have tried many times to get into ROS because, as I would soon realize, the underlying communication system that I was building was just simplified ROS. In the end, I would come to the conclusion that what I'm making is actually better than ROS as it is way easier to get into for noobies -- something that the FRC community seems to love._

# Part 1: Autobahn

## Introduction

So, I set out to build a home brewed solution for my team -- a interconnected PI network that anyone would be able to use to make code that would run off-roborio easily and simply able to connect it back to the main robot process. Firstly, I looked for data passage solutions and tried a few like "nats" etc. However, unfortunately none of the solutions had the intuitive or customizable feel that I so wanted to get from this main part of the project.
