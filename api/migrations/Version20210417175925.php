<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210417175925 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation DROP FOREIGN KEY FK_1981A66D64D218E');
        $this->addSql('ALTER TABLE operation ADD type_id INT NOT NULL');
        $this->addSql('ALTER TABLE operation ADD CONSTRAINT FK_1981A66DC54C8C93 FOREIGN KEY (type_id) REFERENCES operation_type (id)');
        $this->addSql('ALTER TABLE operation ADD CONSTRAINT FK_1981A66D64D218E FOREIGN KEY (location_id) REFERENCES operation_location (id)');
        $this->addSql('CREATE INDEX IDX_1981A66DC54C8C93 ON operation (type_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation DROP FOREIGN KEY FK_1981A66DC54C8C93');
        $this->addSql('ALTER TABLE operation DROP FOREIGN KEY FK_1981A66D64D218E');
        $this->addSql('DROP INDEX IDX_1981A66DC54C8C93 ON operation');
        $this->addSql('ALTER TABLE operation DROP type_id');
        $this->addSql('ALTER TABLE operation ADD CONSTRAINT FK_1981A66D64D218E FOREIGN KEY (location_id) REFERENCES operation_type (id)');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
