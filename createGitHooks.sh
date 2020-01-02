#!/bin/bash
  
echo '#!/bin/bash

red=`tput setaf 1`
reset=`tput sgr0`
./runAppTests.sh appTests/*.test > appTestOut.txt
cat appTestOut.txt | grep '❌' > appTestError.txt
if [ $? == 0 ]; then 
    tput bold
    echo "${red}❌ Fix the AppTests${reset} ❌"
    cat appTestError.txt
    rm appTestOut.txt appTestError.txt
    exit 1
fi
rm appTestOut.txt appTestError.txt

nyc mocha > mochaOutput.txt
if [ $? != 0 ]; then
    tput bold
    echo "${red}❌ Fix the unit test${reset} ❌"
    cat mochaOutput.txt
    rm mochaOutput.txt
    exit 1
fi
rm mochaOutput.txt

eslint src test > eslintError.txt
if [ $? != 0 ]; then 
    tput bold
    echo "${red}❌ Follow ESLint standards${reset} ❌"
    cat eslintError.txt
    rm eslintError.txt
    exit 1
fi
rm eslintError.txt

grep -rn "//" ./src/*.js ./test/*.js ./*.js > CommendedLines.txt
if [ $? == 0 ]; then
    tput bold   
    echo "${red} ❌ Remove the unnecessary lines${reset} ❌"
    count=$(cat CommendedLines.txt | wc -l)
    echo "Total Lines Commended : " $count  
    cat -n CommendedLines.txt
    rm CommendedLines.txt
    exit 1
fi
rm CommendedLines.txt'> .git/hooks/pre-commit

chmod +x .git/hooks/pre-commit
