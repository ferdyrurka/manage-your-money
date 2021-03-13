<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210313131735 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation_category ADD hash VARCHAR(36) NOT NULL');
        $this->addSql('ALTER TABLE operation_location ADD hash VARCHAR(36) NOT NULL');
        $this->addSql('ALTER TABLE operation_type ADD hash VARCHAR(36) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation_category DROP hash');
        $this->addSql('ALTER TABLE operation_location DROP hash');
        $this->addSql('ALTER TABLE operation_type DROP hash');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
