#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
npm run allTest 
if [ \$? != 0 ]; then 
    exit 1
fi
grep -rnw '//' ./src/*.js ./test/*.js ./*.js 
if [ \$? == 0 ]; then
    exit 1
fi
EOF


chmod +x .git/hooks/pre-commit  

cat <<EOF > .git/hooks/pre-push  
npm run lint 
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-push  