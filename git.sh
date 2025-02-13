git add .

# Check if commit message is provided as an argument
if [ -z "$1" ]; then
    # If no argument, use current date and time as commit message
    commitMessage=$(date "+%Y-%m-%d %H:%M:%S")
else
    # Use the provided commit message
    commitMessage="$(date "+%Y-%m-%d %H:%M:%S") --- $1"
fi

git commit -m "$commitMessage"
git push --force


