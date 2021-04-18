<?php

declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

class Version20210418181843 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE operation ADD expense TINYINT(1) DEFAULT \'0\' NOT NULL, ADD income TINYINT(1) DEFAULT \'0\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE operation DROP expense, DROP income');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
