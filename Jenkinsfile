pipeline {
    agent any
    
    tools {nodejs 'Node12.6.2'}
    
    environment {
        CI = 'true'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh "chmod +x -R ./jenkins/scripts/"
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('SonarQubeAnalysis') {
            steps{
                script {
                    scannerHome = tool 'SonarQubeScanner'
                }
                withSonarQubeEnv('SonarQube') {
                    sh 'node --version'
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=gifthub -Dsonar.sources=. -Dsonar.host.url=http://192.168.1.72:9000 -Dsonar.login=${sonarqube_gifthub_token}"
                }
            }
        }
    }
    post {
        always {
            emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results.',
                to: 'dalexis.da@gmail.com,p.casiano33@gmail.com,cris.manu.caste7@gmail.com,maxgt734@gmail.com,brayan.chinchilla.gt@gmail.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],
                [$class: 'RequesterRecipientProvider']], subject: '$PROJECT_NAME  Build # $BUILD_NUMBER - $BUILD_STATUS!'
        }
    }
}