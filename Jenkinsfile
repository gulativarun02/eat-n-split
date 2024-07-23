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
         stage('Deploy to cPanel') {
            steps {
                script {
                    def ftpHost = 'dtglive.online'
                    def ftpUser = 'varun@dtglive.online'
                    def ftpPassword = 'varun@98'
                    def ftpPath = '/public_html/eat-n-split'

                    withCredentials([usernamePassword(credentialsId: 'varun-ftp-id', usernameVariable: 'varun@dtglive.online', passwordVariable: 'varun@98')]) {
                        sh """
                        ncftpput -R -v -u ${FTP_USER} -p ${FTP_PASS} ${ftpHost} ${ftpPath} build/*
                        """
                    }
                }
            }
         }
    }
}