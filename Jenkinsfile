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
                    def ftpPath = '/public_html/eat-n-split'

                    withCredentials([usernamePassword(credentialsId: 'varun-ftp-id', usernameVariable: 'varun@dtglive.online', passwordVariable: 'varun@98')]) {
                        
                            powershell """
                            \$ftpHost = 'dtglive.online'
                            \$ftpUser = 'varun@dtglive.online'
                            \$ftpPass = 'varun@98'
                            \$ftpPath = '/public_html/eat-n-split'

                             Add-Type -Path 'C:\\Program Files (x86)\\WinSCP\\WinSCPnet.dll'

                            \$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
                                Protocol = [WinSCP.Protocol]::ftp
                                HostName = \$ftpHost
                                UserName = \$ftpUser
                                Password = \$ftpPass
                            }

                            \$session = New-Object WinSCP.Session
                            \$session.Open(\$sessionOptions)

                            \$transferOptions = New-Object WinSCP.TransferOptions
                            \$transferOptions.TransferMode = [WinSCP.TransferMode]::Binary

                            \$session.PutFiles('build\\*', \$ftpPath, \$false, \$transferOptions).Check()
                            \$session.Dispose()
                            """
                        
                    }
                }
            }
        }

        // stage('Deploy to cPanel') {
        //     steps {
        //         script {
        //             def ftpHost = 'dtglive.online'
        //             def ftpPath = 'https://www.dtglive.online/eat-n-split'

        //             withCredentials([usernamePassword(credentialsId: 'varun-ftp-id', usernameVariable: 'varun@dtglive.online', passwordVariable: 'varun@98')]) {
        //                     bat """
        //                     echo open https://www.dtglive.online/ > ftp.txt
        //                     echo varun@dtglive.online >> ftp.txt
        //                     echo varun@98 >> ftp.txt
        //                     echo binary >> ftp.txt
        //                     echo cd 'https://www.dtglive.online/eat-n-split' >> ftp.txt
        //                     echo lcd build >> ftp.txt
        //                     echo mput *.* >> ftp.txt
        //                     echo quit >> ftp.txt
        //                     ftp -s:ftp.txt
        //                     del ftp.txt
        //                     """
        //             }
        //         }
        //     }
        // }
    }
}