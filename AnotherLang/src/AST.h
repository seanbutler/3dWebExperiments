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

class ASTNode {

public:
    ASTNode()
    {
        value = "unnamed";
        tag = boost::uuids::random_generator()();

        std::cout << tag << " --- " << value << std::endl;
    }

    virtual ~ASTNode(){}

    std::string Diagram()
    {
        return (std::string) "node"
            + boost::lexical_cast<std::string>(tag)
            + " [ label = \""
            + value
            + ":\" ];\n";
    }

    std::vector<std::shared_ptr<ASTNode>>siblings;
    std::vector<std::shared_ptr<ASTNode>>children;
    std::string value;
    boost::uuids::uuid tag;
};



