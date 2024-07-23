pipeline {
     agent any
     tools{
        nodejs "nodejs"
     }
     stages {
        stage("Build") {
            steps {
                powershell "npm install"
                powershell "npm run build"
            }
        }
        
    }
}