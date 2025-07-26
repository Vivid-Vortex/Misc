#For qwen setup:
npm install -g @qwen-code/qwen-code
qwen --version

#For linux and max
export OPENAI_API_KEY="get_this_from_openrouter"
export OPENAI_BASE_URL="https://openrouter.ai/api/v1"
export OPENAI_MODEL="qwen/qwen3-coder:free"

#export command will not work on windows instead use setx with /M for windows. /M is for system wide. This will store these keys in registry.
setx OPENAI_API_KEY "get_this_from_openrouter" /M
setx OPENAI_BASE_URL "https://openrouter.ai/api/v1" /M
setx OPENAI_MODEL "qwen/qwen3-coder:free" /M

#Go to terminal and run
qwen

#To exit
ctrl + c twice

#YT video reference
https://www.youtube.com/watch?v=kv57HqEb2j8&ab_channel=AstroKJoseph