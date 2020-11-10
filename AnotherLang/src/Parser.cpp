//
// Created by sean on 25/09/2020.
//

#include "Parser.h"
#include "AST.h"

#include <iostream>

void Parser::Parse() {

    abstractSyntaxTree = std::make_shared<ASTNode>();
    abstractSyntaxTree->value = "Module";
    bool tokensPending = true;

    while ( tokensPending  )
    {

        switch (GetNextToken()->kind) {

            case TokenEnum::END_OF_FILE: {
                tokensPending = false;
                break;
            }

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

//            case TokenEnum::KWD_FUNC: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->children.push_back(ParseFunction());
//                break;
//            }

//            case TokenEnum::KWD_IF: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->children.push_back(ParseCondition());
//                break;
//            }

//            case TokenEnum::KWD_WHILE: {
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                abstractSyntaxTree->children.push_back(ParseWhile());
//                break;
//            }

        }

        std::ofstream diagramFile("test.gv");

        diagramFile << "digraph G {" << std::endl;
        diagramFile << "node [shape = box];" << std::endl;
        abstractSyntaxTree->Diagram(diagramFile);
        diagramFile << "}" << std::endl;

        diagramFile.close();

    }
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
    std::shared_ptr<ASTNode> rhsNodeSP = nullptr;

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
    rhsNodeSP = ParseExpression();

    assignmentNodeSP->children.push_back(identifierNodeSP);
    assignmentNodeSP->children.push_back(rhsNodeSP);

    return assignmentNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseExpression() {

    std::shared_ptr<ASTNode> lhsNodeSP = nullptr;

    if ( currentToken->kind == TokenEnum::SYM_LPAREN) {
        lhsNodeSP = ParseExpression();
    }
    else {
        lhsNodeSP = ParseValue();
    }

    std::shared_ptr<ASTNode> operatorNodeSP = nullptr;


//    GetNextToken();
    if ( ( LookAhead().kind != TokenEnum::OP_ADD )
        && ( LookAhead().kind != TokenEnum::OP_SUB )
        && ( LookAhead().kind != TokenEnum::OP_MUL )
        && ( LookAhead().kind != TokenEnum::OP_DIV ) )
    {
        return lhsNodeSP;
    }
    else
    {
        return nullptr;
        // SHOULD PARSE THE OPERATOR HERE?
    }

    std::shared_ptr<ASTNode> rhsNodeSP = nullptr;

    GetNextToken();
    rhsNodeSP = ParseExpression();

    operatorNodeSP->children.push_back(lhsNodeSP);
    operatorNodeSP->children.push_back(rhsNodeSP);

    return operatorNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseParenExpression() {

    std::shared_ptr<ASTNode> exprNodeSP = nullptr;

    GetNextToken();
    if ( currentToken->kind != TokenEnum::SYM_LPAREN) {
        std::cout << "ParseSubExpression() TokenEnum::SYM_LPAREN" << std::endl;
    }

    exprNodeSP = ParseExpression();

    if ( currentToken->kind != TokenEnum::SYM_RPAREN) {
        std::cout << "ParseSubExpression() TokenEnum::SYM_RPAREN" << std::endl;
    }

    return exprNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseOperator() {
    std::shared_ptr<ASTNode> opNodeSP = nullptr;

    if ( currentToken->kind == TokenEnum::OP_ADD) {
        std::cout << "ParseValue() TokenEnum::OP_ADD" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->value = "Add";
    }
    else if ( currentToken->kind == TokenEnum::OP_SUB) {
        std::cout << "ParseValue() TokenEnum::OP_SUB" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->value = "Subtract";
    }
    else if ( currentToken->kind == TokenEnum::OP_MUL) {
        std::cout << "ParseValue() TokenEnum::OP_MUL" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->value = "Multiply";
    }
    else if ( currentToken->kind == TokenEnum::OP_DIV) {
        std::cout << "ParseValue() TokenEnum::OP_DIV" << std::endl;
        opNodeSP = std::make_shared<ASTNode>();
        opNodeSP->value = "Divide";
    }

    return opNodeSP;
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseValue() {
    std::shared_ptr<ASTNode> valueNodeSP = nullptr;

    if ( currentToken->kind == TokenEnum::IDENTIFIER) {
        std::cout << "ParseValue() TokenEnum::IDENTIFIER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->value = "Identifier";
    }
    else if ( currentToken->kind == TokenEnum::NUMBER) {
        std::cout << "ParseValue() TokenEnum::NUMBER" << std::endl;
        valueNodeSP = std::make_shared<ASTNode>();
        valueNodeSP->value = "Number";
    }

    return valueNodeSP;
}

// ----------------------------------------------------------------------

