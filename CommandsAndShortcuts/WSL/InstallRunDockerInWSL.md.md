1. open wsl terminal or start wsl on wsl and open the terminal.
2. sudo snap install docker
3. sudo systemctl enable docker
4. Optional: WSL2 doesn't srat dockerd automatically unlless you use systemd. so -> `sudo dockerd `-> to run it in the background -> `sudo nohup dockerd > /dev/null 2>&1 &`
5. cd /var/run && chmod 777 docker.sock
6. docker run hello-world
7. Optional: Use docker without sudo -> sudo usermod -aG docker $USER -> then logout and back-in and run newgrp docker
8. Optional: sudo  nano /etc/wsl.conf -> systemd=true and wsl --shutdown -> sudo systemctl start docker -> sudo systemctl enable docker.