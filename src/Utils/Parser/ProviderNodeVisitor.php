<?php

namespace Strandafili\NovaInstalledPackages\Utils\Parser;

use PhpParser\NodeVisitorAbstract;

class ProviderNodeVisitor extends NodeVisitorAbstract
{
    public $type;
    public $line;

    public function __construct($type = null, $line)
    {
        $this->type = $type;
        $this->line = $line;
    }

    public function enterNode(Node $node)
    {
        if ($node instanceof ClassMethod) {
            if ($node->name == $this->type) {
                foreach ($node->getStmts() as $stmt) {
                    if ($stmt->getType() == 'Stmt_Return') {
                        $this->line = $stmt->getEndLine();
                        break;
                    }
                }
            }
        }
    }
}
