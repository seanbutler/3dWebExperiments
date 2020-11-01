//
// Created by sean on 28/09/2020.
//

#pragma once
#include <string>
#include <strstream>

#include <vector>
#include <iostream>
#include <memory>

#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_generators.hpp>
#include <boost/uuid/uuid_io.hpp>
#include <boost/lexical_cast.hpp>

// ----------------------------------------------------------------------

static unsigned int gid = 0;

class ASTNode {

public:
    ASTNode()
    {
        id = gid++;
        value = "unnamed";
        tag = boost::uuids::random_generator()();
        std::cout << tag << " --- " << value << std::endl;
    }

    virtual ~ASTNode(){}

    std::string Stringify()
    {
        return (std::string) "node" + std::to_string(id) + " ["
            + " uuid = \"" + boost::lexical_cast<std::string>(tag) + "\""
            + " label = \"" + value + "\""
            + " ];\n"
            ;
    }

    void Diagram()
    {
        std::cout << Stringify();

        for(auto N : children) {
            N->Diagram();
        }

        for(auto N : siblings) {
            N->Diagram();
        }
    }

    unsigned int id;
    std::vector<std::shared_ptr<ASTNode>>siblings;
    std::vector<std::shared_ptr<ASTNode>>children;

    std::string value;
    boost::uuids::uuid tag;
};

// ----------------------------------------------------------------------

