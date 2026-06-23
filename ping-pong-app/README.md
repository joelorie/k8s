# Log Output

Application for exercise _2.1_

## Installation

- Clone the repository
- Build the docker image with `docker build -t ping-pong-app:2.1 . `
- Create the deployment with `kubectl apply -f manifests`

### Note

For k3s, you may have to import the image into it so that you can use it locally. This can be done using the command `k3d image import <image-tag>`
You then need to edit the deployment's pull policy to either _Never_ or _IfNotPresent_.
