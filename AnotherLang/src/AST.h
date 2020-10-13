//
// Created by sean on 28/09/2020.
//

#pragma once
#include <string>
#include <strstream>

#include <vector>
#include <iostream>

#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_generators.hpp>
#include <boost/uuid/uuid_io.hpp>
#include <boost/lexical_cast.hpp>

// ----------------------------------------------------------------------

class ASTNode {

public:
    ASTNode(const std::string & V = "undefined")
        : value(V)
    {
        tag = boost::uuids::random_generator()();
        std::cout << tag << std::endl;
    }

    virtual ~ASTNode(){}

    const std::string &getValue()       { return value; }

    std::vector<std::unique_ptr<ASTNode>>siblings;
    std::vector<std::unique_ptr<ASTNode>>children;
    const std::string value;
    boost::uuids::uuid tag;
};


// ----------------------------------------------------------------------

class IdentifierAST : public ASTNode {

public:
    IdentifierAST()
        : ASTNode("Identifier")
    {
    }

    std::string Diagram()
    {
        return (std::string) "node" + boost::lexical_cast<std::string>(tag) + " [ label = \"identifier:\" ];\n";
    }
};

// ----------------------------------------------------------------------

class DeclarationAST : public ASTNode {

public:
    DeclarationAST()
        : ASTNode("Declaration")
    {
    }

    std::string Diagram()
    {
        return (std::string) "node" + boost::lexical_cast<std::string>(tag) + " [ label = \"declaration:\" ];\n";
    }
};

// ----------------------------------------------------------------------
