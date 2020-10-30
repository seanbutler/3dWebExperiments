//
// Created by sean on 25/09/2020.
//

#include "Parser.h"
#include "AST.h"

void Parser::Parse() {

    abstractSyntaxTree = std::make_shared<ASTNode>();
    abstractSyntaxTree->value = "Module";

    while (GetNextToken()->kind != TokenEnum::END_OF_FILE)
    {

        switch (currentToken->kind) {

            case TokenEnum::KWD_DECL: {
                std::cout << "Parser::Parse() TokenEnum::KWD_DECL" << std::endl;
                abstractSyntaxTree->siblings.push_back(ParseDeclaration());
                break;
            }

            case TokenEnum::IDENTIFIER: {
                std::cout << "Parser::Parse() TokenEnum::IDENTIFIER" << std::endl;
                abstractSyntaxTree->siblings.push_back(ParseAssignment());
                break;
            }

//            case TokenEnum::KWD_FUNC: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->siblings.push_back(ParseFunction());
//                break;
//            }

//            case TokenEnum::KWD_IF: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->siblings.push_back(ParseCondition());
//                break;
//            }

//            case TokenEnum::KWD_WHILE: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->siblings.push_back(ParseWhile());
//                break;
//            }

        }
    }
    abstractSyntaxTree->Diagram();

}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseDeclaration() {
    std::shared_ptr<ASTNode> declarationNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;

    if ( currentToken->kind == TokenEnum::KWD_DECL) {
        std::cout << "ParseDeclaration() TokenEnum::KWD_DECL" << std::endl;
        declarationNodeSP = std::make_shared<ASTNode>();
        declarationNodeSP->value = "Declaration";
    }
    else {
        return nullptr;
    }

    GetNextToken();

    if ( currentToken->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseDeclaration() TokenEnum::IDENTIFIER" << std::endl;
        identifierNodeSP = std::make_shared<ASTNode>();
        identifierNodeSP->value = "Identifier";
    }
    else {
        return nullptr;
    }

    declarationNodeSP->children.push_back(identifierNodeSP);
    return declarationNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseAssignment() {
    std::shared_ptr<ASTNode> assignmentNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;
    std::shared_ptr<ASTNode> numberNodeSP = nullptr;

    if ( currentToken->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseAssignment() TokenEnum::IDENTIFIER" << std::endl;
        identifierNodeSP = std::make_shared<ASTNode>();
        identifierNodeSP->value = "Identifier";
    }
    else {
        return nullptr;
    }

    GetNextToken();
    if ( currentToken->kind == TokenEnum::SYM_ASSIGN) {
        std::cout << "ParseAssignment() TokenEnum::SYM_ASSIGN" << std::endl;
        assignmentNodeSP = std::make_shared<ASTNode>();
        assignmentNodeSP->value = "Assignment";
    }
    else {
        return nullptr;
    }

    GetNextToken();
    if ( currentToken->kind == TokenEnum::NUMBER) {
        std::cout << "ParseAssignment() TokenEnum::NUMBER" << std::endl;
        numberNodeSP = std::make_shared<ASTNode>();
        numberNodeSP->value = "Number";
    }
    else {
        return nullptr;
    }

    assignmentNodeSP->children.push_back(identifierNodeSP);
    assignmentNodeSP->children.push_back(numberNodeSP);

    return assignmentNodeSP;
}

