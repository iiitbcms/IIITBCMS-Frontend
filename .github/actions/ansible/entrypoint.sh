#!/bin/sh

echo "Ansible Entrypoint"
#echo "This is the secret: $SSH_PASSWORD"
#echo "ansible_ssh_pass: $SSH_PASSWORD" >> /hosts.yml
#echo "ansible_become_pass: $SSH_PASSWORD" >> /hosts.yml

ansible-playbook ansible/playbook.yml
