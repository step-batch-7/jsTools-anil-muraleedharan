#!/bin/bash
  
echo '#!/bin/bash

red=`tput setaf 1`
reset=`tput sgr0`
./runAppTests.sh appTests/*.test > appTestOut.txt
cat appTestOut.txt | grep '❌' > appTestError.txt
if [ $? == 0 ]; then 
    tput bold
    echo "${red}❌ Fix the AppTests${reset} ❌${red}"
    cat appTestError.txt
    rm appTestOut.txt appTestError.txt
    exit 1
fi
rm appTestOut.txt appTestError.txt

mocha -R tap > mochaOutput.txt
cat mochaOutput.txt | grep '^not' > mochaError.txt
if [ $? == 0 ]; then
    tput bold
    echo "${red}❌ Fix the unit test${reset} ❌${red}"
    cat -n mochaError.txt
    rm mochaOutput.txt mochaError.txt
    exit 1
fi
rm mochaOutput.txt mochaError.txt

eslint src test > eslintError.txt
if [ $? != 0 ]; then 
    tput bold
    echo "${red}❌ Follow ESLint standards${reset} ❌${red}"
    cat eslintError.txt
    rm eslintError.txt
    exit 1
fi
rm eslintError.txt

grep -rn "//" ./src/*.js ./test/*.js ./*.js > CommendedLines.txt
if [ $? == 0 ]; then
    tput bold   
    echo "${red} ❌ Remove the unnecessary lines${reset} ❌${red}"
    count=$(cat CommendedLines.txt | wc -l)
    echo "Total Lines Commended : " $count  
    cat -n CommendedLines.txt
    rm CommendedLines.txt
    exit 1
fi
rm CommendedLines.txt'> .git/hooks/pre-commit

chmod +x .git/hooks/pre-commit
