//
// Created by sean on 25/09/2020.
//

#include "Parser.h"
#include "AST.h"

void Parser::Parse(ASTNode tree) {

    while (GetNextToken()->kind != TokenEnum::END_OF_FILE)
    {
        abstractSyntaxTree->siblings.emplace_back(ParseStatement());
    }
}

std::unique_ptr<ASTNode> Parser::ParseStatement() {

    switch (currentToken->kind) {

        case TokenEnum::KWD_DECL: {
            std::cout << "TokenEnum::KWD_DECL" << std::endl;

            auto node = std::make_unique<DeclarationAST>(DeclarationAST());


            return node;
        }

    }
}

