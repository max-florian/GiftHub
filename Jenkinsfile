pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-p 3000:3000'
        }
    }
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
    }
    post {
        always {
            emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Check console output at $BUILD_URL to view the results. By $GIT_AUTHOR_NAME',
                to: 'dalexis.da@gmail.com,p.casiano33@gmail.com,cris.manu.caste7@gmail.com,maxgt734@gmail.com,brayan.chinchilla.gt@gmail.com',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'],
                [$class: 'RequesterRecipientProvider']], subject: '$PROJECT_NAME  Build # $BUILD_NUMBER - $BUILD_STATUS!'
        }
    }
}