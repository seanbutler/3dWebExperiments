#include <iostream>

#include "./src/Tokenizer.h"
#include "./src/AST.h"
#include "./src/Parser.h"

#include <string>
#include <fstream>
#include <streambuf>

int main(int argc, char**argv) {
    char filename[] = "test.src";

    std::ifstream t(filename);
    std::string str((std::istreambuf_iterator<char>(t)), std::istreambuf_iterator<char>());

    Tokenizer tokenizer;
    tokenizer.SetInputString(str);
    tokenizer.SetFilename(filename);
    tokenizer.Scan();

    std::vector<Token> tokens = tokenizer.GetOutputTokens();

    for(auto tok : tokens) {
        std::cout << tok.file << "\t" << tok.line << "\t"
                << (int)tok.kind  << "\t"
                << tok.name << "\t"
                << std::endl;
    }

    Parser parser;
    parser.SetInput(tokens);

    ASTNode tree("Compile Unit");
//    parser.Parse(tree);
    return 0;
}
