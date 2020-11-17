//
// Created by sean on 25/09/2020.
//

#include "Parser.h"
#include "AST.h"

#include <iostream>

void Parser::Parse(std::shared_ptr<ASTNode> & ast) {

    tokenItor = tokens.begin();

    ast = ParseStatements();

    std::ofstream diagramFile("test.gv");
    diagramFile << "digraph G {" << std::endl;
    diagramFile << "node [shape = box];" << std::endl;
    ast->Diagram(diagramFile);
    diagramFile << "}" << std::endl;
    diagramFile.close();

}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseStatements() {

    std::shared_ptr<ASTNode> statementsNodeSP = nullptr;
    statementsNodeSP = std::make_shared<ASTNode>();
    statementsNodeSP->type = "Statements";
    statementsNodeSP->value = "";

    while ( tokenItor->kind != TokenEnum::END_OF_FILE )
    {
        switch (tokenItor->kind) {

            // DECLARATION
            case TokenEnum::KWD_DECL: {
                std::cout << "Parser::Parse() TokenEnum::KWD_DECL" << std::endl;
                statementsNodeSP->children.push_back(ParseDeclaration());
                break;
            }

            // IDENTIFIER therefore ASSIGNMENT
            case TokenEnum::IDENTIFIER: {
                std::cout << "Parser::Parse() TokenEnum::IDENTIFIER" << std::endl;
                statementsNodeSP->children.push_back(ParseAssignment());
                break;
            }

            // WHILE statement
            case TokenEnum::KWD_WHILE:{
                std::cout << "Parser::Parse() TokenEnum::KWD_WHILE" << std::endl;
                statementsNodeSP->children.push_back(ParseWhile());
                break;
            }

            // IF statement
            case TokenEnum::KWD_IF:{
                std::cout << "Parser::Parse() TokenEnum::KWD_IF" << std::endl;
                statementsNodeSP->children.push_back(ParseIf());
                break;
            }

            case TokenEnum::KWD_PROC: {
                std::cout << "Parser::Parse() TokenEnum::KWD_PROC" << std::endl;
                statementsNodeSP->children.push_back(ParseProcedure());
                break;
            }

//            case TokenEnum::KWD_FUNC:{
//                std::cout << "Parser::Parse() TokenEnum::KWD_FUNC" << std::endl;
//                statementsNodeSP->children.push_back(ParseFunc());
//                break;
//            }

        }

    }

    return statementsNodeSP;

}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseDeclaration() {
    std::shared_ptr<ASTNode> declarationNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::KWD_DECL) {
        std::cout << "ParseDeclaration() TokenEnum::KWD_DECL" << std::endl;
        declarationNodeSP = std::make_shared<ASTNode>();
        declarationNodeSP->type = "Keyword";
        declarationNodeSP->value = "decl";

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
    else {
        return nullptr;
    }

}

// ----------------------------------------------------------------------

//std::shared_ptr<ASTNode> Parser::ParseDeclaration() {
//    std::shared_ptr<ASTNode> declarationNodeSP = nullptr;
//    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;
//
//    if ( tokenItor->kind == TokenEnum::KWD_DECL) {
//        std::cout << "ParseDeclaration() TokenEnum::KWD_DECL" << std::endl;
//        declarationNodeSP = std::make_shared<ASTNode>();
//        declarationNodeSP->type = "Keyword";
//        declarationNodeSP->value = "decl";
//
//        tokenItor++;
//
//        if ( tokenItor->kind == TokenEnum::IDENTIFIER) {
//            std::cout << "ParseDeclaration() TokenEnum::IDENTIFIER" << std::endl;
//            identifierNodeSP = std::make_shared<ASTNode>();
//            identifierNodeSP->type = "Identifier";
//            identifierNodeSP->value = tokenItor->name;
//        }
//        else {
//            return nullptr;
//        }
//
//        tokenItor++;
//
//        declarationNodeSP->children.push_back(identifierNodeSP);
//        return declarationNodeSP;
//
//    }
//    else {
//        return nullptr;
//    }
//
//
//}

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

std::shared_ptr<ASTNode> Parser::ParseIf() {

    std::shared_ptr<ASTNode> statementNodeSP = nullptr;
    std::shared_ptr<ASTNode> conditionNodeSP = nullptr;
    std::shared_ptr<ASTNode> blockNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::KWD_IF ) {
        std::cout << "ParseIf() TokenEnum::KWD_IF" << std::endl;
        statementNodeSP = std::make_shared<ASTNode>();
        statementNodeSP->type = "Keyword";
        statementNodeSP->value = "if";
        tokenItor++;

        if ( tokenItor->kind == TokenEnum::SYM_LPAREN) {

            tokenItor++;
            conditionNodeSP = ParseExpression();
            statementNodeSP->children.push_back(conditionNodeSP);

            if ( tokenItor->kind == TokenEnum::SYM_RPAREN) {
                tokenItor++;

                if ( tokenItor->kind == TokenEnum::SYM_LBRACES) {
                    tokenItor++;

                    blockNodeSP = ParseBlock();
                    statementNodeSP->children.push_back(blockNodeSP);

                    if (tokenItor->kind == TokenEnum::SYM_RBRACES) {
                        tokenItor++;

                        return statementNodeSP;
                    }
                }
            }
        }
    }
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseWhile() {

    std::shared_ptr<ASTNode> statementNodeSP = nullptr;
    std::shared_ptr<ASTNode> conditionNodeSP = nullptr;
    std::shared_ptr<ASTNode> blockNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::KWD_WHILE ) {
        std::cout << "ParseWhile() TokenEnum::KWD_WHILE" << std::endl;
        statementNodeSP = std::make_shared<ASTNode>();
        statementNodeSP->type = "Keyword";
        statementNodeSP->value = "while";
        tokenItor++;

        if ( tokenItor->kind == TokenEnum::SYM_LPAREN) {

            tokenItor++;
            conditionNodeSP = ParseExpression();
            statementNodeSP->children.push_back(conditionNodeSP);

            if ( tokenItor->kind == TokenEnum::SYM_RPAREN) {
                tokenItor++;

                if ( tokenItor->kind == TokenEnum::SYM_LBRACES) {
                    tokenItor++;

                    blockNodeSP = ParseBlock();
                    statementNodeSP->children.push_back(blockNodeSP);

                    if (tokenItor->kind == TokenEnum::SYM_RBRACES) {
                        tokenItor++;

                        return statementNodeSP;
                    }
                }
            }
        }
    }
}

// ----------------------------------------------------------------------

std::shared_ptr<ASTNode> Parser::ParseBlock() {

    std::cout << "ParseBlock()" << std::endl;

    std::shared_ptr<ASTNode> statementsNodeSP = nullptr;

    statementsNodeSP = std::make_shared<ASTNode>();
    statementsNodeSP->type = "Block";
    statementsNodeSP->value = "";

    while ( tokenItor->kind != TokenEnum::SYM_RBRACES )
    {
        switch (tokenItor->kind) {

            // DECLARATION
            case TokenEnum::KWD_DECL: {
                std::cout << "Parser::Parse() TokenEnum::KWD_DECL" << std::endl;
                statementsNodeSP->children.push_back(ParseDeclaration());
                break;
            }

            // IDENTIFIER therefore ASSIGNMENT
            case TokenEnum::IDENTIFIER: {
                std::cout << "Parser::Parse() TokenEnum::IDENTIFIER" << std::endl;
                statementsNodeSP->children.push_back(ParseAssignment());
                break;
            }

            // WHILE Statement
            case TokenEnum::KWD_WHILE:{
                std::cout << "Parser::Parse() TokenEnum::KWD_WHILE" << std::endl;
                statementsNodeSP->children.push_back(ParseWhile());
                break;
            }

            // IF Statement
            case TokenEnum::KWD_IF:{
                std::cout << "Parser::Parse() TokenEnum::KWD_IF" << std::endl;
                statementsNodeSP->children.push_back(ParseIf());
                break;
            }

        }
    }

    return statementsNodeSP;

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

std::shared_ptr<ASTNode> Parser::ParseProcedure() {

    std::shared_ptr<ASTNode> statementNodeSP = nullptr;
    std::shared_ptr<ASTNode> identifierNodeSP = nullptr;
    std::shared_ptr<ASTNode> blockNodeSP = nullptr;

    if ( tokenItor->kind == TokenEnum::KWD_PROC ) {
        std::cout << "ParseProcedure() TokenEnum::KWD_PROC" << std::endl;
        statementNodeSP = std::make_shared<ASTNode>();
        statementNodeSP->type = "Keyword";
        statementNodeSP->value = "proc";

        tokenItor++;

        if ( tokenItor->kind == TokenEnum::IDENTIFIER) {
            std::cout << "ParseProcedure() TokenEnum::IDENTIFIER" << std::endl;
            identifierNodeSP = std::make_shared<ASTNode>();
            identifierNodeSP->type = "Identifier";
            identifierNodeSP->value = tokenItor->name;

            tokenItor++;

            if ( tokenItor->kind == TokenEnum::SYM_LBRACES) {
                tokenItor++;

                blockNodeSP = ParseBlock();
                statementNodeSP->children.push_back(blockNodeSP);

                if (tokenItor->kind == TokenEnum::SYM_RBRACES) {
                    tokenItor++;

                    return statementNodeSP;
                }
            }
        }
    }
}

std::shared_ptr<ASTNode> Parser::ParseFunc() {

}