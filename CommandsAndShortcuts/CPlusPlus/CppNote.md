To install GCC Compiler in Ubuntu:-
sudo apt install build-essential
To install ninja-build, which is used to make dll file:-
sudo apt install ninja-build
To install cmkae
sudo apt install cmake ninja-build mingw-w64

Create a dir name MyDll
inside MyDll create include folder for .h files
inside MyDll create src folder for .cpp files
inside MyDll, create CMakeLists.txt
create another folder inside MyDll named build

cd build
cmake -G "Ninja" -DCMAKE_SYSTEM_NAME=Windows -DCMAKE_C_COMPILER=x86_64-w64-mingw32-gcc -DCMAKE_CXX_COMPILER=x86_64-w64-mingw32-g++ #to compile the classes

cd ..

x86_64-w64-mingw32-gcc -shared -o MyDll.dll src/MyDll.cpp -Iinclude -lstdc++ -lgcc #to make dll
