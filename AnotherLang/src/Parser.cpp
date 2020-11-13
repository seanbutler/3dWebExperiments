//
// Created by sean on 25/09/2020.
//

#include "Parser.h"
#include "AST.h"

#include <iostream>

void Parser::Parse() {

    abstractSyntaxTree = std::make_shared<ASTNode>();
    abstractSyntaxTree->type = "Module";
    abstractSyntaxTree->value = "";

    tokenItor = tokens.begin();

    while ( tokenItor->kind != TokenEnum::END_OF_FILE )
    {
        switch (tokenItor->kind) {

            // DECLARATION
            case TokenEnum::KWD_DECL: {
                std::cout << "Parser::Parse() TokenEnum::KWD_DECL" << std::endl;
                abstractSyntaxTree->children.push_back(ParseDeclaration());
                break;
            }

            // IDENTIFIER therefore ASSIGNMENT
            case TokenEnum::IDENTIFIER: {
                std::cout << "Parser::Parse() TokenEnum::IDENTIFIER" << std::endl;
                abstractSyntaxTree->children.push_back(ParseAssignment());
                break;
            }
        }

        std::ofstream diagramFile("test.gv");
        diagramFile << "digraph G {" << std::endl;
        diagramFile << "node [shape = box];" << std::endl;
        abstractSyntaxTree->Diagram(diagramFile);
        diagramFile << "}" << std::endl;
        diagramFile.close();

//        tokenItor++;
    }

    std::ofstream diagramFile("test.gv");
    diagramFile << "digraph G {" << std::endl;
    diagramFile << "node [shape = box];" << std::endl;
    abstractSyntaxTree->Diagram(diagramFile);
    diagramFile << "}" << std::endl;
    diagramFile.close();

}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseDeclaration() {
    std::shared_ptr<ASTNode> declarationNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::KWD_DECL) {
        std::cout << "ParseDeclaration() TokenEnum::KWD_DECL" << std::endl;
        declarationNodeSP = std::make_shared<ASTNode>();
        declarationNodeSP->type = "Keyword";
        declarationNodeSP->value = "Declaration";
    }
    else {
        return nullptr;
    }

    tokenItor++;

    if ( tokenItor->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseDeclaration() TokenEnum::IDENTIFIER" << std::endl;
        identifierNodeSP = std::make_shared<ASTNode>();
        identifierNodeSP->type = "Identifier";
        identifierNodeSP->value = tokenItor->name;
    }
    else {
        return nullptr;
    }

    tokenItor++;

    declarationNodeSP->children.push_back(identifierNodeSP);
    return declarationNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseAssignment() {

    std::shared_ptr<ASTNode> assignmentNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;
    std::shared_ptr<ASTNode> rhsNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::IDENTIFIER) {

        std::cout << "ParseAssignment() TokenEnum::IDENTIFIER" << std::endl;
        identifierNodeSP = std::make_shared<ASTNode>();
        identifierNodeSP->type = "Identifier";
        identifierNodeSP->value = tokenItor->name;
        tokenItor++;

        if ( tokenItor->kind == TokenEnum::SYM_ASSIGN) {

            std::cout << "ParseAssignment() TokenEnum::SYM_ASSIGN" << std::endl;
            assignmentNodeSP = std::make_shared<ASTNode>();
            assignmentNodeSP->type = "Assignment";
            assignmentNodeSP->value = "=";
            tokenItor++;

            rhsNodeSP = ParseExpression();
            assignmentNodeSP->children.push_back(identifierNodeSP);
            assignmentNodeSP->children.push_back(rhsNodeSP);

            return assignmentNodeSP;
        }
        else {
            return nullptr;
        }
    }
    else {
        return nullptr;
    }

}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseExpression() {

    std::shared_ptr<ASTNode> lhsNodeSP = nullptr;
    std::shared_ptr<ASTNode> exprNodeSP = nullptr;
    std::shared_ptr<ASTNode> rhsNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::NUMBER) {
        lhsNodeSP = ParseNumber();
    }
    else if( tokenItor->kind == TokenEnum::IDENTIFIER ) {
        lhsNodeSP = ParseIdentifier();
    }
    else {
        return nullptr;
    }

    if ( ( (tokenItor+1)->kind == TokenEnum::OP_ADD )
            || ( (tokenItor+1)->kind == TokenEnum::OP_SUB )
            || ( (tokenItor+1)->kind == TokenEnum::OP_MUL )
            || ( (tokenItor+1)->kind == TokenEnum::OP_DIV ) ) {
        std::cout << "ParseAssignment() TokenEnum::SYM_ASSIGN" << std::endl;

        tokenItor++;
        exprNodeSP = ParseOperator();
        tokenItor++;
        exprNodeSP->children.push_back(lhsNodeSP);
        exprNodeSP->children.push_back(ParseExpression());
        return exprNodeSP;
    }

    tokenItor++;
    return lhsNodeSP;
}


// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseOperator() {
    std::shared_ptr<ASTNode> opNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::OP_ADD) {
        std::cout << "ParseValue() TokenEnum::OP_ADD" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->type = "Operator";
        opNodeSP->value = "+";
    }
    else if ( tokenItor->kind == TokenEnum::OP_SUB) {
        std::cout << "ParseValue() TokenEnum::OP_SUB" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->type = "Operator";
        opNodeSP->value = "-";
    }
    else if ( tokenItor->kind == TokenEnum::OP_MUL) {
        std::cout << "ParseValue() TokenEnum::OP_MUL" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->type = "Operator";
        opNodeSP->value = "*";
    }
    else if ( tokenItor->kind == TokenEnum::OP_DIV) {
        std::cout << "ParseValue() TokenEnum::OP_DIV" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->type = "Operator";
        opNodeSP->value = "/";
    }

    return opNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseValue() {
    std::shared_ptr<ASTNode> valueNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseValue() TokenEnum::IDENTIFIER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->type = "Identifier";
        valueNodeSP->value = tokenItor->name;
    }
    else if ( tokenItor->kind == TokenEnum::NUMBER) {
        std::cout << "ParseValue() TokenEnum::NUMBER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->type = "Number";
        valueNodeSP->value = tokenItor->name;
    }

    return valueNodeSP;
}


std::shared_ptr<ASTNode> Parser::ParseNumber() {
    std::shared_ptr<ASTNode> valueNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::NUMBER) {
        std::cout << "ParseNumber() TokenEnum::NUMBER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->type = "Number";
        valueNodeSP->value = tokenItor->name;
    }

    return valueNodeSP;
}

std::shared_ptr<ASTNode> Parser::ParseIdentifier() {
    std::shared_ptr<ASTNode> valueNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseIdentifier() TokenEnum::IDENTIFIER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->type = "Identifier";
        valueNodeSP->value = tokenItor->name;
    }
    return valueNodeSP;
}

// ----------------------------------------------------------------------

