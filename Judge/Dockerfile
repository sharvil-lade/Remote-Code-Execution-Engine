FROM ubuntu:24.04

# Update and install utilities
RUN apt-get update && apt-get install -y apt-utils

# Install build tools (GCC and G++)
RUN apt-get install -y gcc g++

# Install Python
RUN apt-get install -y python3

# Install Java (JDK and JRE)
RUN apt-get install -y default-jdk default-jre

# Install additional dependencies for managing repositories
RUN apt-get update && apt-get install -y software-properties-common

# Add repository for Oracle Java 17 and install it
RUN add-apt-repository ppa:linuxuprising/java && apt-get update
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 73C3DB2A
RUN apt-get install -y oracle-java17-installer

# Create and set permissions for a directory
RUN mkdir /home/folderrun && chmod 775 /home/folderrun && chmod g+s /home/folderrun && chmod u+x /home/folderrun

# Install sudo
RUN apt-get install -y sudo
