<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210312221319 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BBE8F6465E237E06 ON operation_location (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A3AE0AB85E237E06 ON operation_type (name)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_BBE8F6465E237E06 ON operation_location');
        $this->addSql('DROP INDEX UNIQ_A3AE0AB85E237E06 ON operation_type');
    }
}
